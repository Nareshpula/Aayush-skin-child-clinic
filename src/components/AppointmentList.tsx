import React from 'react';
import { useAppointments } from './AppointmentContext';
import { Loader2, Calendar, Clock, User, Phone } from 'lucide-react';

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Helper function to format time
const formatTime = (timeString: string) => {
  // If the time is already in 12-hour format (e.g., "09:30 AM"), return it as is
  if (timeString.includes('AM') || timeString.includes('PM')) {
    return timeString;
  }
  
  // Convert from 24-hour format (e.g., "09:30:00") to 12-hour format
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours);
  const minute = parseInt(minutes);
  
  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12; // Convert 0 to 12 for 12 AM
  
  return `${hour12.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${period}`;
};

const AppointmentList = () => {
  const { upcomingAppointments, loadingAppointments } = useAppointments();

  if (loadingAppointments) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-[#7a3a95]" />
      </div>
    );
  }

  if (upcomingAppointments.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">No upcoming appointments.</p>
      </div>
    );
  }

  // Group appointments by date
  const appointmentsByDate = upcomingAppointments.reduce((acc, appointment) => {
    // Get the date from the slot
    const date = appointment.slot?.date || '';
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(appointment);
    return acc;
  }, {} as Record<string, typeof upcomingAppointments>);

  return (
    <div className="space-y-6">
      {Object.entries(appointmentsByDate).map(([date, appointments]) => (
        <div key={date} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-[#7a3a95] text-white px-4 py-3">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              <h3 className="font-medium">{formatDate(date)}</h3>
            </div>
          </div>
          
          <div className="divide-y divide-gray-100">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src={appointment.slot?.doctor?.profile_image || '/placeholder-avatar.png'} 
                      alt={appointment.slot?.doctor?.name || 'Doctor'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">{appointment.slot?.doctor?.name}</h4>
                        <p className="text-sm text-[#7a3a95]">{appointment.slot?.doctor?.specialization}</p>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="text-sm">{formatTime(appointment.slot?.time || '')}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1 text-gray-400" />
                        <span>{appointment.patient_name}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-1 text-gray-400" />
                        <span>{appointment.phone_number}</span>
                      </div>
                    </div>
                    
                    {appointment.reason && (
                      <div className="mt-2 text-sm text-gray-500">
                        <p className="line-clamp-2">{appointment.reason}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppointmentList;