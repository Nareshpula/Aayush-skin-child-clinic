import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase, Doctor } from '@/lib/supabase';
import { 
  isSunday, 
  formatTime, 
  formatDateForDisplay, 
  isDateTodayOrPast, 
  isDateFuture,
  parseDateInIST,
  getDayName
} from '@/utils/timeZoneUtils';
import { DateTime } from 'luxon';

interface DoctorAvailabilityCalendarProps {
  doctor: Doctor;
  onSelectSlot: (date: string, time: string) => void;
  selectedDate: string;
  selectedTime: string;
}

const DoctorAvailabilityCalendar: React.FC<DoctorAvailabilityCalendarProps> = ({
  doctor,
  onSelectSlot,
  selectedDate,
  selectedTime
}) => {
  const [currentMonth, setCurrentMonth] = useState(DateTime.now().setZone('Asia/Kolkata').toJSDate());
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [timeSlots, setTimeSlots] = useState<{ time: string; available: boolean }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'morning' | 'evening'>('morning');
  const [isSundaySelected, setIsSundaySelected] = useState(false);
  
  // Generate calendar days for the current month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    // Add empty days for the start of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };
  
  // Get available dates for the doctor
  useEffect(() => {
    const getAvailableDates = () => {
      // Get all days in the current month
      const days = getDaysInMonth(currentMonth);
      
      // Filter out past dates and get available dates
      const today = DateTime.now().setZone('Asia/Kolkata').startOf('day');
      
      const availableDays = days.filter(day => {
        if (!day) return false;
        
        // Convert to Luxon DateTime for proper timezone handling
        const dayLuxon = DateTime.fromJSDate(day).setZone('Asia/Kolkata');
        
        // Check if the day is in the future
        if (dayLuxon < today) return false;
        
        // Check if the doctor is available on this day of the week
        const dayOfWeek = dayLuxon.weekday;
        const dayName = dayLuxon.toFormat('EEEE'); // Full day name
        
        return doctor.available_days?.includes(dayName);
      });
      
      setAvailableDates(availableDays);
    };
    
    getAvailableDates();
  }, [currentMonth, doctor]);
  
  // Get time slots for the selected date
  useEffect(() => {
    const getTimeSlots = async () => {
      if (!selectedDate) {
        setTimeSlots([]);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        console.log(`Fetching time slots for doctor ${doctor.id} on ${selectedDate}`);
        
        // Call the get_available_slots_simple function
        const { data, error } = await supabase.rpc('get_available_slots_simple', {
          p_doctor_id: doctor.id,
          p_date: selectedDate
        });
        
        if (error) {
          console.error('Error fetching time slots:', error);
          setError('Failed to load available time slots');
          return;
        }
        
        console.log(`Received ${data?.length || 0} time slots:`, data);
        
        if (data?.length === 0) {
          console.log('No time slots available for this date');
        }
        
        // Transform the data
        const slots = data.map((slot: any) => ({
          time: slot.time_slot,
          available: slot.is_available
        }));
        
        setTimeSlots(slots);
        
        // Set active tab based on first available slot
        if (slots.length > 0) {
          const firstSlotHour = parseInt(slots[0].time.split(':')[0]);
          setActiveTab(firstSlotHour < 16 ? 'morning' : 'evening');
        }
        
        // Check if the selected date is a Sunday
        const selectedDateObj = parseDateInIST(selectedDate);
        const isSundayDate = isSunday(selectedDateObj);
        console.log('Selected date is Sunday:', isSundayDate);
        setIsSundaySelected(isSundayDate);
        
      } catch (err) {
        console.error('Error in getTimeSlots:', err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    getTimeSlots();
  }, [selectedDate, doctor.id]);
  
  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentMonth(prev => {
      const prevMonth = DateTime.fromJSDate(prev).setZone('Asia/Kolkata').minus({ months: 1 }).toJSDate();
      return prevMonth;
    });
  };
  
  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentMonth(prev => {
      const nextMonth = DateTime.fromJSDate(prev).setZone('Asia/Kolkata').plus({ months: 1 }).toJSDate();
      return nextMonth;
    });
  };
  
  // Format date as YYYY-MM-DD
  const formatDate = (date: Date) => {
    return DateTime.fromJSDate(date).setZone('Asia/Kolkata').toFormat('yyyy-MM-dd');
  };
  
  // Check if a date is selected
  const isDateSelected = (date: Date) => {
    if (!selectedDate) return false;
    
    // Format both dates to YYYY-MM-DD for comparison
    const formattedSelectedDate = selectedDate;
    const formattedDate = formatDate(date);
    
    return formattedSelectedDate === formattedDate;
  };
  
  // Check if a date is available
  const isDateAvailable = (date: Date | null) => {
    if (!date) return false;
    
    // Convert to Luxon DateTime for proper timezone handling
    const dateLuxon = DateTime.fromJSDate(date).setZone('Asia/Kolkata');
    const todayLuxon = DateTime.now().setZone('Asia/Kolkata').startOf('day');
    
    // Check if date is today
    if (dateLuxon.hasSame(todayLuxon, 'day')) {
      return false;
    }
    
    return availableDates.some(availableDate => 
      availableDate.getDate() === date.getDate() &&
      availableDate.getMonth() === date.getMonth() &&
      availableDate.getFullYear() === date.getFullYear()
    );
  };
  
  // Handle date selection
  const handleDateSelect = (date: Date) => {
    if (!isDateAvailable(date)) return;

    console.log('Selected date:', date);
    
    // Format the date as YYYY-MM-DD for the API
    const formattedDate = formatDate(date);
    console.log('Formatted date:', formattedDate);
    
    // Clear any previously selected time
    onSelectSlot(formattedDate, '');
    
    // Check if the selected date is a Sunday using Luxon
    const dateLuxon = DateTime.fromJSDate(date).setZone('Asia/Kolkata');
    const isSundayDate = dateLuxon.weekday === 7; // In Luxon, 7 is Sunday
    console.log('Is Sunday (Luxon):', isSundayDate);
    setIsSundaySelected(isSundayDate);
  };
  
  // Handle time slot selection
  const handleTimeSelect = (time: string, available: boolean) => {
    if (!available) return;
    
    onSelectSlot(selectedDate, time);
  };
  
  // Filter time slots based on active tab
  const filteredTimeSlots = timeSlots.filter(slot => {
    const hour = parseInt(slot.time.split(':')[0]);
    return activeTab === 'morning' ? hour < 16 : hour >= 16;
  });
  
  // Get day names for calendar header
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Get days for the current month
  const days = getDaysInMonth(currentMonth);
  
  // Get the selected date object for proper day name display
  const selectedDateObj = selectedDate ? parseDateInIST(selectedDate) : null;
  
  // Debug output
  React.useEffect(() => {
    if (selectedDate) {
      const dateObj = parseDateInIST(selectedDate);
      console.log('Selected date object:', dateObj);
      console.log('Day of week (Luxon):', DateTime.fromJSDate(dateObj).setZone('Asia/Kolkata').weekday);
      console.log('Is Sunday (Luxon):', DateTime.fromJSDate(dateObj).setZone('Asia/Kolkata').weekday === 7);
      console.log('Formatted display:', formatDateForDisplay(dateObj));
    }
  }, [selectedDate]);
  
  return (
    <div className="space-y-6">
      {/* Date Selector */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Date</h3>
        
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={goToPreviousMonth}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          
          <span className="text-gray-700 font-medium">
            {DateTime.fromJSDate(currentMonth).setZone('Asia/Kolkata').toFormat('LLLL yyyy')}
          </span>
          
          <button
            onClick={goToNextMonth}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Day names */}
          {dayNames.map((day) => (
            <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
              {day}
            </div>
          ))}
          
          {/* Calendar days */}
          {days.map((day, index) => (
            <div key={index} className="aspect-square">
              {day ? (
                <button
                  onClick={() => handleDateSelect(day)}
                  disabled={!isDateAvailable(day)}
                  className={cn(
                    "w-full h-full flex items-center justify-center rounded-lg text-sm transition-colors",
                    isDateSelected(day) 
                      ? "bg-[#7a3a95] text-white" 
                      : isDateAvailable(day)
                        ? "hover:bg-purple-100 text-gray-700"
                        : "text-gray-300 cursor-not-allowed"
                  )}
                >
                  {day.getDate()}
                </button>
              ) : (
                <div className="w-full h-full"></div>
              )}
            </div>
          ))}
        </div>
        
        {/* Selected Date Info */}
        {selectedDate && selectedDateObj && (
          <div className="mt-4 p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center text-[#7a3a95] flex-wrap break-words">
              <CalendarIcon className="w-5 h-5 mr-2 flex-shrink-0" />
              <span className="font-medium break-words">
                Selected Date: {formatDateForDisplay(selectedDateObj)}
              </span>
            </div>
          </div>
        )}
        
        {/* Today's date warning */}
        {selectedDate && isDateTodayOrPast(parseDateInIST(selectedDate)) && (
          <div className="mt-4 p-3 bg-red-50 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-red-700 text-sm">
                Same-day appointments are not allowed. Please select a future date.
              </span>
            </div>
          </div>
        )}
      </div>
      
      {/* Time Slots */}
      {selectedDate && isDateFuture(parseDateInIST(selectedDate)) && (
        <div className="bg-white rounded-lg shadow-md p-4 mt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Time</h3>
          
          {/* Morning/Evening Tabs */}
          <div className="flex flex-wrap border-b border-gray-200 mb-4">
            <button
              onClick={() => setActiveTab('morning')}
              className={`flex-1 py-2 px-4 text-center font-medium transition-colors ${
                activeTab === 'morning'
                  ? "text-[#7a3a95] border-b-2 border-[#7a3a95]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Morning (10 AM to {isSundaySelected ? '1 PM' : '3 PM'})
            </button>
            
            {/* Only show evening tab if not Sunday */}
            {!isSundaySelected && (
              <button
                onClick={() => setActiveTab('evening')}
                className={`flex-1 py-2 px-4 text-center font-medium transition-colors ${
                  activeTab === 'evening'
                    ? "text-[#7a3a95] border-b-2 border-[#7a3a95]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Evening (6 PM to 9 PM)
              </button>
            )}
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-8 h-8 border-4 border-[#7a3a95] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : filteredTimeSlots.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No available time slots for the {activeTab} session.
              {isSundaySelected && activeTab === 'evening' && (
                <p className="mt-2 text-sm text-blue-600">
                  Note: Evening slots are not available on Sundays.
                </p>
              )}
            </div>
          ) : (
            <div className="mt-2">
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {filteredTimeSlots.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => handleTimeSelect(slot.time, slot.available)}
                    disabled={!slot.available}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      selectedTime === slot.time
                        ? "bg-[#7a3a95] text-white shadow-md"
                        : slot.available
                          ? "bg-purple-50 text-[#7a3a95] hover:bg-purple-100 hover:shadow-sm"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed opacity-60"
                    }`}
                  >
                    {formatTime(slot.time)}
                  </button>
                ))}
              </div>
              
              {/* Note about Sunday hours */}
              {selectedDate && isSundaySelected && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700 break-words">
                    <strong>Note:</strong> On Sundays, Dr. {doctor.name} is available only from 10:00 AM to 1:00 PM.
                  </p>
                </div>
              )}
            </div>
          )}
          
          {/* Selected Time Info */}
          {selectedTime && (
            <div className="mt-4 p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center text-[#7a3a95]">
                <Clock className="w-5 h-5 mr-2" />
                <span className="font-medium">
                  Selected Time: {formatTime(selectedTime)}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DoctorAvailabilityCalendar;