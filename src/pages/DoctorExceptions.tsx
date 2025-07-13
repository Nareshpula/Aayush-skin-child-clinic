import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Trash2, Plus, X, Loader2, ArrowLeft } from 'lucide-react';
import { fetchDoctors, Doctor } from '@/lib/supabase';
import { getDoctorExceptions, addDoctorException, removeDoctorException, DoctorException } from '@/lib/appointment';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const DoctorExceptions = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [exceptions, setExceptions] = useState<DoctorException[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    reason: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);

  // Load doctors and exceptions
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Load doctors
        const doctorsData = await fetchDoctors();
        setDoctors(doctorsData);
        
        // Load exceptions
        const { success, data, error: exceptionsError } = await getDoctorExceptions();
        
        if (success && data) {
          setExceptions(data);
        } else if (exceptionsError) {
          setError(exceptionsError);
        }
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDoctor || !formData.date || !formData.startTime || !formData.endTime) {
      setError('Please fill all required fields');
      return;
    }
    
    // Validate start time is before end time
    if (formData.startTime >= formData.endTime) {
      setError('Start time must be before end time');
      return;
    }
    
    setSubmitting(true);
    setError(null);
    
    try {
      const { success, data, error: addError } = await addDoctorException(
        selectedDoctor,
        formData.date,
        formData.startTime,
        formData.endTime,
        formData.reason
      );
      
      if (success && data) {
        // Reload exceptions
        const { success: reloadSuccess, data: reloadData } = await getDoctorExceptions();
        
        if (reloadSuccess && reloadData) {
          setExceptions(reloadData);
        }
        
        // Close modal and reset form
        setShowAddModal(false);
        setFormData({
          date: '',
          startTime: '',
          endTime: '',
          reason: ''
        });
      } else if (addError) {
        setError(addError);
      }
    } catch (err) {
      console.error('Error adding exception:', err);
      setError('Failed to add exception. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle delete exception
  const handleDeleteException = async (exceptionId: number) => {
    setDeleting(exceptionId);
    
    try {
      const { success, error: deleteError } = await removeDoctorException(exceptionId);
      
      if (success) {
        // Remove from local state
        setExceptions(prev => prev.filter(exception => exception.id !== exceptionId));
      } else if (deleteError) {
        setError(deleteError);
      }
    } catch (err) {
      console.error('Error deleting exception:', err);
      setError('Failed to delete exception. Please try again later.');
    } finally {
      setDeleting(null);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format time
  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const minute = parseInt(minutes);
    
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12; // Convert 0 to 12 for 12 AM
    
    return `${hour12}:${minute.toString().padStart(2, '0')} ${period}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4 pt-4">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex items-center">
              <button 
                onClick={() => navigate('/admin-dashboard')}
                className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Manage Doctor Availability</h1>
                <p className="text-gray-600 mt-1">Set doctor's unavailable hours</p>
              </div>
            </div>
            
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-[#7a3a95] text-white rounded-lg hover:bg-[#6a2a85] transition-colors duration-200 flex items-center whitespace-nowrap"
            >
              <Plus className="w-5 h-5 mr-2" />
              Update Availability
            </button>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
              <button 
                className="float-right text-red-700 hover:text-red-900"
                onClick={() => setError(null)}
              >
                ×
              </button>
            </div>
          )}
          
          {loading ? (
            <div className="bg-white rounded-lg shadow-md p-8 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-[#7a3a95] mr-3" />
              <p className="text-gray-600">Loading doctor availability data...</p>
            </div>
          ) : exceptions.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600 mb-4">No unavailable time slots found.</p>
              <p className="text-gray-500">Add time slots when doctors are unavailable for appointments.</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Doctor
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Time Range
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reason
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {exceptions.map((exception) => (
                      <tr key={exception.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{exception.doctor_name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatDate(exception.date)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="text-sm text-gray-900">
                            {formatTime(exception.start_time)} - {formatTime(exception.end_time)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{exception.reason || 'No reason provided'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button
                            onClick={() => handleDeleteException(exception.id)}
                            disabled={deleting === exception.id}
                            className="text-red-600 hover:text-red-900 transition-colors duration-200"
                          >
                            {deleting === exception.id ? (
                              <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                              <Trash2 className="w-5 h-5" />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Add Exception Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden"
          >
            <div className="flex justify-between items-center p-4 border-b bg-[#7a3a95] text-white">
              <h2 className="text-lg font-semibold">Update Doctor Availability</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label htmlFor="doctor" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Doctor <span className="text-red-500">*</span>
                </label>
                <select
                  id="doctor"
                  value={selectedDoctor || ''}
                  onChange={(e) => setSelectedDoctor(parseInt(e.target.value))}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a3a95] focus:border-[#7a3a95]"
                >
                  <option value="">Select Doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Unavailable Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a3a95] focus:border-[#7a3a95] pl-10"
                  />
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                    From Time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="time"
                      id="startTime"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a3a95] focus:border-[#7a3a95] pl-10"
                    />
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                    To Time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="time"
                      id="endTime"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a3a95] focus:border-[#7a3a95] pl-10"
                    />
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                  Reason (Optional)
                </label>
                <textarea
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a3a95] focus:border-[#7a3a95] resize-none"
                  placeholder="Reason for unavailability"
                ></textarea>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-[#7a3a95] text-white rounded-lg hover:bg-[#6a2a85] transition-colors duration-200 disabled:bg-purple-300 disabled:cursor-not-allowed flex items-center font-medium"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Update Availability'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DoctorExceptions;