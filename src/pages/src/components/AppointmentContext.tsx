import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, Doctor, Appointment, fetchDoctors, getAppointments } from '@/lib/supabase';

interface AppointmentContextType {
  doctors: Doctor[];
  loadingDoctors: boolean;
  refreshDoctors: () => Promise<void>;
  upcomingAppointments: Appointment[];
  loadingAppointments: boolean;
  refreshAppointments: () => Promise<void>;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointments must be used within an AppointmentProvider');
  }
  return context;
};

interface AppointmentProviderProps {
  children: ReactNode;
}

export const AppointmentProvider: React.FC<AppointmentProviderProps> = ({ children }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);

  const refreshDoctors = async () => {
    setLoadingDoctors(true);
    try {
      const doctorsData = await fetchDoctors(); 
      console.log('AppointmentContext: Fetched doctors count:', doctorsData?.length || 0);
      setDoctors(doctorsData);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoadingDoctors(false);
    }
  };

  const refreshAppointments = async () => {
    setLoadingAppointments(true);
    try {
      const appointments = await getAppointments();
      setUpcomingAppointments(appointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoadingAppointments(false);
    }
  };

  // Initial data loading
  useEffect(() => {
    refreshDoctors();
    refreshAppointments(); 
    
    // Subscribe to real-time changes
    const appointmentsSubscription = supabase
      .channel('appointments-changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'aayush', 
        table: 'appointments' 
      }, () => {
        refreshAppointments();
      })
      .subscribe();
    
    const appointmentSlotsSubscription = supabase
      .channel('appointment-slots-changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'aayush', 
        table: 'appointment_slots' 
      }, () => {
        refreshAppointments();
      })
      .subscribe();
      
    return () => {
      supabase.removeChannel(appointmentsSubscription);
      supabase.removeChannel(appointmentSlotsSubscription);
    };
  }, []);

  const value = {
    doctors,
    loadingDoctors,
    refreshDoctors,
    upcomingAppointments,
    loadingAppointments,
    refreshAppointments
  };

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
};