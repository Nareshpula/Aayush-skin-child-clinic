import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock, ChevronRight } from 'lucide-react';
import { useAppointments } from '../components/AppointmentContext';
import AppointmentList from '../components/AppointmentList';

const AdminDashboard = () => {
  const { upcomingAppointments, loadingAppointments, doctors, loadingDoctors } = useAppointments();
  const [activeTab, setActiveTab] = useState<'appointments' | 'doctors'>('appointments');

  // Count today's appointments
  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = upcomingAppointments.filter(
    appointment => appointment.appointment_date === today
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Today's Appointments</p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">
                    {loadingAppointments ? '...' : todayAppointments.length}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Appointments</p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">
                    {loadingAppointments ? '...' : upcomingAppointments.length}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Active Doctors</p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">
                    {loadingDoctors ? '...' : doctors.length}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('appointments')}
                className={`flex-1 py-4 px-6 text-center font-medium ${
                  activeTab === 'appointments' 
                    ? 'text-[#7a3a95] border-b-2 border-[#7a3a95]' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Upcoming Appointments
              </button>
              <button
                onClick={() => setActiveTab('doctors')}
                className={`flex-1 py-4 px-6 text-center font-medium ${
                  activeTab === 'doctors' 
                    ? 'text-[#7a3a95] border-b-2 border-[#7a3a95]' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Doctors
              </button>
            </div>
            
            <div className="p-6">
              {activeTab === 'appointments' ? (
                <AppointmentList />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {loadingDoctors ? (
                    <div className="col-span-full flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#7a3a95]"></div>
                    </div>
                  ) : doctors.length === 0 ? (
                    <div className="col-span-full text-center py-8 text-gray-500">
                      No doctors found.
                    </div>
                  ) : (
                    doctors.map(doctor => (
                      <div key={doctor.id} className="bg-gray-50 rounded-lg p-4 flex items-start gap-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                          <img 
                            src={doctor.image_url} 
                            alt={doctor.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{doctor.name}</h3>
                          <p className="text-sm text-[#7a3a95]">{doctor.title}</p>
                          <p className="text-xs text-gray-500 mt-1">{doctor.experience}</p>
                          
                          <div className="mt-2 flex flex-wrap gap-1">
                            {doctor.specialties.map((specialty, index) => (
                              <span 
                                key={index}
                                className="px-2 py-0.5 bg-purple-100 text-[#7a3a95] text-xs rounded-full"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                onClick={() => window.location.href = '/book-appointment'}
                className="flex items-center justify-between p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200"
              >
                <span className="font-medium text-[#7a3a95]">Book New Appointment</span>
                <ChevronRight className="w-5 h-5 text-[#7a3a95]" />
              </button>
              
              <button 
                className="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
              >
                <span className="font-medium text-blue-600">View All Appointments</span>
                <ChevronRight className="w-5 h-5 text-blue-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;