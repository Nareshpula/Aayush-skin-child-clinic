import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Search, Download, Filter, X, LogOut } from 'lucide-react';
import { getAppointments, Appointment, subscribeToAppointments } from '@/lib/supabase';
import { getCurrentUser, logout as authLogout } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { useNavigate, Navigate } from 'react-router-dom';

const AppointmentsDashboard = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const currentUser = getCurrentUser();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Sort appointments by date and time (newest first)
  const sortAppointmentsByDateDesc = (appointments: Appointment[]) => {
    return [...appointments].sort((a, b) => {
      // Compare dates first
      const dateA = a.slot?.date || '';
      const dateB = b.slot?.date || '';
      
      if (dateA !== dateB) {
        return dateB.localeCompare(dateA); // Descending order (newest first)
      }
      
      // If dates are the same, compare times
      const timeA = a.slot?.time || '';
      const timeB = b.slot?.time || '';
      return timeB.localeCompare(timeA); // Descending order (latest time first)
    });
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointments();
        const sortedData = sortAppointmentsByDateDesc(data);
        setAppointments(sortedData);
        setFilteredAppointments(sortedData);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
    
    // Subscribe to real-time updates
    const subscription = subscribeToAppointments(() => {
      fetchAppointments();
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Apply filters whenever search term or dates change
    let filtered = appointments;

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        appointment => 
          appointment.patient_name.toLowerCase().includes(term) ||
          appointment.phone_number.includes(term) ||
          (appointment.patient_id && appointment.patient_id.toLowerCase().includes(term))
      );
    }

    // Apply date range filter
    if (startDate && !endDate) {
      // If only start date is provided, filter for that specific day
      filtered = filtered.filter(
        appointment => {
          if (!appointment.slot?.date) return false;
          return appointment.slot.date === startDate;
        }
      );
    } else if (startDate && endDate) {
      // If both dates are provided, filter for the range
      filtered = filtered.filter(
        appointment => {
          if (!appointment.slot?.date) return true;
          return new Date(appointment.slot.date) >= new Date(startDate);
        }
      );

      filtered = filtered.filter(
        appointment => {
          if (!appointment.slot?.date) return true;
          return new Date(appointment.slot.date) <= new Date(endDate);
        }
      );
    }
    
    // Sort the filtered appointments
    const sortedFiltered = sortAppointmentsByDateDesc(filtered);
    setFilteredAppointments(sortedFiltered);
  }, [searchTerm, startDate, endDate, appointments]);

  const clearFilters = () => {
    setSearchTerm('');
    setStartDate('');
    setEndDate('');
  };

  const getTotalAppointments = () => {
    return appointments.length;
  };

  const getTodayAppointments = () => {
    const today = new Date().toISOString().split('T')[0];
    return appointments.filter(appointment => 
      appointment.slot?.date === today
    ).length;
  };

  const getUpcomingAppointments = () => {
    const today = new Date().toISOString().split('T')[0];
    return appointments.filter(appointment => 
      appointment.slot?.date && appointment.slot.date > today
    ).length;
  };

  const exportToCSV = () => {
    // Create CSV content
    const headers = ['Patient ID', 'Patient Name', 'Phone', 'Age', 'Gender', 'Doctor', 'Date', 'Time', 'Reason'];
    
    const csvRows = [
      headers.join(','),
      ...filteredAppointments.map(appointment => {
        const values = [
          appointment.patient_id || '',
          `"${appointment.patient_name.replace(/"/g, '""')}"`, // Escape quotes in CSV
          appointment.phone_number,
          appointment.age,
          appointment.gender,
          `"${appointment.doctor?.name || ''}"`,
          appointment.slot?.date || '',
          appointment.slot?.time || '',
          `"${(appointment.reason || '').replace(/"/g, '""')}"` // Escape quotes in CSV
        ];
        return values.join(',');
      })
    ];
    
    const csvContent = csvRows.join('\n');
    
    // Create a blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `appointments_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle logout
  const handleLogout = () => {
    // Set logging out state to trigger transition
    setIsLoggingOut(true);
    
    // Clear user session
    authLogout();
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format time for display
  const formatTime = (timeString: string) => {
    if (!timeString) return '';
    
    // Check if time is already in 12-hour format
    if (timeString.includes('AM') || timeString.includes('PM')) {
      return timeString;
    }
    
    // Convert from 24-hour format to 12-hour format
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const minute = parseInt(minutes);
    
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12; // Convert 0 to 12 for 12 AM
    
    return `${hour12}:${minute.toString().padStart(2, '0')} ${period}`;
  };

  // If logging out, redirect to login page
  if (isLoggingOut) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md p-6 mb-8">
          {/* Header with user info and logout */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h1 className="text-3xl font-bold text-gray-900">View Appointments</h1>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Logged in as</p>
                <p className="font-medium text-gray-900">{currentUser?.username} ({currentUser?.role})</p>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors flex items-center gap-2"
                title="Logout"
              >
                <span className="hidden md:inline text-gray-700">Logout</span>
                <LogOut className="w-5 h-5 text-gray-700" /> 
              </button>
            </div>
          </div>

          <p className="text-gray-600 mb-6">Manage and track patient appointments</p>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "rounded-xl p-6 border-l-4 border-blue-500",
                "bg-blue-50"
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-700 font-medium">Total</p>
                  <h3 className="text-3xl font-bold text-blue-700 mt-1">
                    {getTotalAppointments()}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-700" />
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className={cn(
                "rounded-xl p-6 border-l-4 border-green-500",
                "bg-green-50"
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-700 font-medium">Today</p>
                  <h3 className="text-3xl font-bold text-green-700 mt-1">
                    {getTodayAppointments()}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-green-700" />
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className={cn(
                "rounded-xl p-6 border-l-4 border-orange-500",
                "bg-orange-50"
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-700 font-medium">Upcoming</p>
                  <h3 className="text-3xl font-bold text-orange-700 mt-1">
                    {getUpcomingAppointments()}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-orange-200 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-orange-700" />
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Filters and Search */}
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by name, phone, or ID"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#783b94] focus:border-[#783b94] bg-white"
                />
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative">
                  <input
                    type="date"
                    id="startDate"
                    placeholder="From Date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#783b94] focus:border-[#783b94] bg-white"
                  />
                </div>
                
                <div className="relative">
                  <input
                    type="date"
                    id="endDate"
                    placeholder="To Date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#783b94] focus:border-[#783b94] bg-white"
                  />
                </div>
                
                {(searchTerm || startDate || endDate) && (
                  <button
                    onClick={clearFilters}
                    className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Clear
                  </button>
                )}
                
                <button
                  onClick={exportToCSV}
                  className="px-4 py-3 bg-[#783b94] text-white rounded-lg hover:bg-[#6a2a85] transition-colors flex items-center justify-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </button>
              </div>
            </div>
          </div>
          
          {/* Appointments Table */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient ID
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Doctor
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reason
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center">
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#783b94]"></div>
                          <span className="ml-3 text-gray-500">Loading appointments...</span>
                        </div>
                      </td>
                    </tr>
                  ) : filteredAppointments.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <Calendar className="w-12 h-12 text-gray-300 mb-4" />
                          <p className="text-gray-500 text-lg">No appointments found</p>
                          <p className="text-gray-400 text-sm mt-1">Try adjusting your search or date filters</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredAppointments.map((appointment) => (
                      <tr key={appointment.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-[#783b94]">
                          {appointment.patient_id || 'N/A'}
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{appointment.patient_name}</div>
                          <div className="text-sm text-gray-500">{appointment.age} yrs, {appointment.gender}</div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{appointment.doctor?.name || 'N/A'}</div>
                          <div className="text-sm text-gray-500">{appointment.doctor?.specialization || ''}</div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatDate(appointment.slot?.date || '')}</div>
                          <div className="text-sm text-gray-500">{formatTime(appointment.slot?.time || '')}</div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{appointment.phone_number}</div>
                          <div className="text-sm text-gray-500">{appointment.email || 'No email'}</div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="text-sm text-gray-900 max-w-xs truncate">
                            {appointment.reason || 'No reason provided'}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsDashboard;