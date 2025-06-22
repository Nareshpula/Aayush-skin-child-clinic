import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { getAvailableSlots, getDoctorExceptions, AvailableSlot, DoctorException } from '@/lib/appointment';
import { Doctor, supabase } from '@/lib/supabase';

// Define format function at the top level to avoid "Cannot access before initialization" error
const format = (date: Date, formatStr: string) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[date.getDay()];
};

interface DoctorAvailabilityCalendarProps {
  doctor: Doctor;
  onSelectSlot: (date: string, time: string) => void;
  selectedDate?: string;
  selectedTime?: string;
}

const DoctorAvailabilityCalendar: React.FC<DoctorAvailabilityCalendarProps> = ({
  doctor,
  onSelectSlot,
  selectedDate,
  selectedTime
}) => {
  // State variables
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [exceptions, setExceptions] = useState<DoctorException[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'morning' | 'evening'>('morning');

  // Load doctor exceptions
  useEffect(() => {
    const loadExceptions = async () => {
      const startDate = new Date(currentMonth);
      startDate.setDate(1);
      
      const endDate = new Date(currentMonth);
      endDate.setMonth(endDate.getMonth() + 1);
      endDate.setDate(0);
      
      const { success, data } = await getDoctorExceptions(
        doctor.id,
        startDate.toISOString().split('T')[0],
        endDate.toISOString().split('T')[0]
      );
      
      if (success && data) {
        setExceptions(data);
      }
    };
    
    loadExceptions();
  }, [doctor.id, currentMonth]);

  // Load available slots when a date is selected
  useEffect(() => {
    if (selectedDate) {
      const loadAvailableSlots = async () => { 
        setLoading(true);
        try {
          console.log(`Fetching available slots for doctor ${doctor.id} on ${selectedDate}`);
          
          // Direct RPC call to get available slots
          const { data, error } = await supabase.rpc('get_available_slots', {
            p_doctor_id: doctor.id,
            p_date: selectedDate
          });
          
          if (error) {
            console.error('Error fetching available slots:', error);
            setAvailableSlots([]);
          } else if (data) {
            console.log('Available slots data:', data);
            
            // Transform the data to match the AvailableSlot interface
            const transformedSlots: AvailableSlot[] = data.map((slot: any) => ({
              time_slot: slot.time_slot,
              is_available: slot.is_available
            }));
            
            setAvailableSlots(transformedSlots);
          }
        } catch (error) {
          console.error('Error in loadAvailableSlots:', error);
          setAvailableSlots([]);
        } finally {
          setLoading(false);
        }
      };
      
      loadAvailableSlots();
    }
  }, [doctor.id, selectedDate]);

  // Check if a date is available (not in exceptions)
  const isDateAvailable = (date: Date) => {
    const dayName = format(date, 'EEEE');
    // Check if the doctor is available on this day
    if (!doctor) {
      return false;
    }
    
    // Check if available_days exists and includes the day name
    return doctor.available_days ? doctor.available_days.includes(dayName) : false;
  };

  // Format time from "HH:MM:SS" to "HH:MM AM/PM"
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const minute = parseInt(minutes, 10);
    
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12; // Convert 0 to 12 for 12 AM
    
    return `${hour12}:${minute.toString().padStart(2, '0')} ${period}`;
  };

  // Handle date click
  const handleDateClick = (date: Date) => {
    if (isDateAvailable(date)) {
      const formattedDate = date.toISOString().split('T')[0];
      onSelectSlot(formattedDate, '');
    }
  };

  // Handle time slot click
  const handleTimeSlotClick = (time: string) => {
    if (selectedDate) {
      onSelectSlot(selectedDate, time);
    }
  };

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Generate time slots based on the day of week
  const generateTimeSlots = (date: string): string[] => {
    const selectedDay = new Date(date).getDay(); // 0 = Sunday, 1 = Monday, etc.
    const isSunday = selectedDay === 0;
    
    // Morning slots (10:00 AM to 3:00 PM)
    const morningSlots: string[] = [];
    let currentTime = new Date();
    currentTime.setHours(10, 0, 0); // Start at 10:00 AM
    
    const morningEndTime = new Date();
    morningEndTime.setHours(isSunday ? 13 : 15, 0, 0); // End at 1:00 PM for Sunday, 3:00 PM otherwise
    
    while (currentTime < morningEndTime) {
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const period = hours >= 12 ? 'PM' : 'AM';
      const hour12 = hours % 12 || 12;
      
      morningSlots.push(`${hour12}:${minutes.toString().padStart(2, '0')} ${period}`);
      
      // Increment by 15 minutes
      currentTime.setMinutes(currentTime.getMinutes() + 15);
    }
    
    // Evening slots (6:00 PM to 9:00 PM) - only for non-Sundays
    const eveningSlots: string[] = [];
    if (!isSunday) {
      currentTime = new Date();
      currentTime.setHours(18, 0, 0); // Start at 6:00 PM
      
      const eveningEndTime = new Date();
      eveningEndTime.setHours(21, 0, 0); // End at 9:00 PM
      
      while (currentTime < eveningEndTime) {
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const period = 'PM';
        const hour12 = hours % 12 || 12;
        
        eveningSlots.push(`${hour12}:${minutes.toString().padStart(2, '0')} ${period}`);
        
        // Increment by 15 minutes
        currentTime.setMinutes(currentTime.getMinutes() + 15);
      }
    }
    
    return activeTab === 'morning' ? morningSlots : eveningSlots;
  };

  // Filter slots based on active tab
  const getFilteredSlots = () => {
    if (!selectedDate) return [];
    
    // Generate time slots based on the day
    const allTimeSlots = generateTimeSlots(selectedDate);
    
    // Check which slots are available based on the availableSlots data
    return allTimeSlots.map(timeStr => {
      // Convert from "10:00 AM" format to "10:00:00" format for comparison
      const [time, period] = timeStr.split(' ');
      const [hour, minute] = time.split(':');
      let hour24 = parseInt(hour);
      
      // Convert to 24-hour format
      if (period === 'PM' && hour24 < 12) hour24 += 12;
      if (period === 'AM' && hour24 === 12) hour24 = 0;
      
      const timeFormatted = `${hour24.toString().padStart(2, '0')}:${minute}:00`;
      
      // Find if this slot exists in availableSlots
      const slot = availableSlots.find(s => s.time_slot === timeFormatted);
      
      return {
        time: timeStr,
        is_available: slot ? slot.is_available : true // Default to available if not found
      };
    });
  };

  // Generate dates for the current month
  const generateDates = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const dates: Date[] = [];
    
    // Add dates from previous month to fill the first week
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek; i > 0; i--) {
      const date = new Date(year, month, 1 - i);
      dates.push(date);
    }
    
    // Add dates from current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      dates.push(date);
    }
    
    // Add dates from next month to fill the last week
    const lastDayOfWeek = lastDay.getDay();
    for (let i = 1; i < 7 - lastDayOfWeek; i++) {
      const date = new Date(year, month + 1, i);
      dates.push(date);
    }
    
    return dates;
  };

  // Filter slots based on active tab
  const filteredSlots = availableSlots.filter(slot => {
    const hour = parseInt(slot.time_slot.split(':')[0]);
    return activeTab === 'morning' ? (hour >= 9 && hour < 15) : hour >= 18;
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Select Date</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPreviousMonth}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <span className="text-gray-700 font-medium">
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </span>
          <button
            onClick={goToNextMonth}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="mb-6">
        {/* Day names */}
        <div className="grid grid-cols-7 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-gray-500 text-sm font-medium">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {generateDates().map((date, index) => {
            const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
            const isToday = date.toDateString() === new Date().toDateString();
            const isSelected = selectedDate === date.toISOString().split('T')[0];
            const available = isDateAvailable(date);
            
            return (
              <motion.button
                key={index}
                whileHover={{ scale: available ? 1.1 : 1 }}
                whileTap={{ scale: available ? 0.95 : 1 }}
                onClick={() => available && handleDateClick(date)}
                disabled={!available}
                className={`
                  h-10 rounded-full flex items-center justify-center text-sm
                  ${isCurrentMonth ? 'text-gray-800' : 'text-gray-400'}
                  ${isToday ? 'border border-[#7a3a95]' : ''}
                  ${isSelected ? 'bg-[#7a3a95] text-white' : ''}
                  ${available && !isSelected ? 'hover:bg-purple-100' : ''}
                  ${!available ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                  transition-colors duration-200
                `}
              >
                {date.getDate()}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center flex-wrap">
            <Clock className="w-5 h-5 mr-2 text-[#7a3a95]" />
            Select Time
            <span className="ml-2 text-xs text-orange-600 font-normal whitespace-normal">
              {new Date(selectedDate).getDay() === 0 
                ? "(Sunday hours: 10:00 AM - 1:00 PM only)" 
                : "(Morning: 10:00 AM - 3:00 PM, Evening: 6:00 PM - 9:00 PM)"}
            </span>
          </h3>

          {/* Tabs */}
          <div className="flex mb-4">
            <button
              onClick={() => setActiveTab('morning')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'morning' 
                  ? "bg-[#7a3a95] text-white" 
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Morning
              <span className="hidden sm:inline"> (10:00 AM - {new Date(selectedDate).getDay() === 0 ? '1:00 PM' : '3:00 PM'})</span>
            </button>
            <button
              onClick={() => setActiveTab('evening')}
              disabled={new Date(selectedDate).getDay() === 0}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                new Date(selectedDate).getDay() === 0 ? 'opacity-50 cursor-not-allowed ' : ''
              }${
                activeTab === 'evening' 
                  ? "bg-[#7a3a95] text-white" 
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Evening
              <span className="hidden sm:inline"> (6:00 PM - 9:00 PM)</span>
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#7a3a95]"></div>
            </div>
          ) : getFilteredSlots().length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No available slots for this date and time range. Please try another date.
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {getFilteredSlots().map((slot, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: slot.is_available ? 1.05 : 1 }}
                  whileTap={{ scale: slot.is_available ? 0.95 : 1 }}
                  onClick={() => slot.is_available && handleTimeSlotClick(slot.time)}
                  disabled={!slot.is_available}
                  className={`
                    py-2 px-1 text-center rounded-md transition-all border shadow-sm text-sm
                    ${!slot.is_available 
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                      : selectedTime === slot.time
                        ? "bg-[#7a3a95] text-white font-medium"
                        : "bg-white hover:bg-gray-100 text-gray-800"
                    }
                  `}
                >
                  {slot.time}
                </motion.button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DoctorAvailabilityCalendar;