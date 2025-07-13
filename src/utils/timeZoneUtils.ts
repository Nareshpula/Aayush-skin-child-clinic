/**
 * Utility functions for handling dates and times using Luxon
 */
import { DateTime } from 'luxon';

/**
 * Parse a date string in IST timezone to avoid UTC conversion issues
 * 
 * @param dateStr - Date string in YYYY-MM-DD format
 * @returns Date object in IST timezone
 */
export const parseDateInIST = (dateStr: string): Date => {
  // Create a DateTime object in IST timezone
  const dt = DateTime.fromISO(dateStr, { zone: 'Asia/Kolkata' });
  
  // Convert to JavaScript Date object
  return dt.toJSDate();
};

/**
 * Checks if a date is a Sunday
 * 
 * @param date - Date to check
 * @returns Boolean indicating if the date is a Sunday
 */
export const isSunday = (date: Date): boolean => {
  // Convert to Luxon DateTime for reliable day of week
  const dt = DateTime.fromJSDate(date);
  // 7 = Sunday in Luxon (unlike JS Date where 0 = Sunday)
  return dt.weekday === 7;
};

/**
 * Formats a date to a human-readable string
 * 
 * @param date - Date to format
 * @returns Formatted date string (e.g., "Sunday, July 13, 2025")
 */
export const formatDateForDisplay = (date: Date): string => {
  // Convert to Luxon DateTime for reliable formatting
  const dt = DateTime.fromJSDate(date);
  return dt.toFormat('EEEE, MMMM d, yyyy');
};

/**
 * Gets the day name for a date
 * 
 * @param date - Date to get the day name for
 * @returns Day name (e.g., "Sunday")
 */
export const getDayName = (date: Date): string => {
  // Convert to Luxon DateTime for reliable day name
  const dt = DateTime.fromJSDate(date);
  return dt.toFormat('EEEE');
};

/**
 * Formats a time string to 12-hour format
 * 
 * @param timeString - Time string in 24-hour format (HH:MM:SS)
 * @returns Formatted time string in 12-hour format (HH:MM AM/PM)
 */
export const formatTime = (timeString: string): string => {
  // If time is already in 12-hour format (e.g., "09:30 AM"), return it as is
  if (timeString.includes('AM') || timeString.includes('PM')) {
    return timeString;
  }
  
  // Parse the time string
  const [hours, minutes] = timeString.split(':').map(Number);
  
  // Create a DateTime object with the time
  const dt = DateTime.fromObject({ hour: hours, minute: minutes });
  
  // Format to 12-hour time
  return dt.toFormat('h:mm a');
};

/**
 * Checks if a date is today or in the past
 * 
 * @param date - Date to check
 * @returns Boolean indicating if the date is today or in the past
 */
export const isDateTodayOrPast = (date: Date): boolean => {
  // Convert both dates to Luxon DateTime objects set to start of day
  const dt = DateTime.fromJSDate(date).startOf('day');
  const today = DateTime.now().startOf('day');
  
  // Compare dates
  return dt <= today;
};

/**
 * Checks if a date is in the future
 * 
 * @param date - Date to check
 * @returns Boolean indicating if the date is in the future
 */
export const isDateFuture = (date: Date): boolean => {
  // Convert both dates to Luxon DateTime objects set to start of day
  const dt = DateTime.fromJSDate(date).startOf('day');
  const today = DateTime.now().startOf('day');
  
  // Compare dates
  return dt > today;
};

/**
 * Formats a date with the day name
 * 
 * @param date - Date to format
 * @returns Formatted date string with day name (e.g., "Sunday, July 13, 2025")
 */
export const formatDateWithDayName = (date: Date): string => {
  return formatDateForDisplay(date);
};

/**
 * Checks if a date is today
 * 
 * @param date - Date to check
 * @returns Boolean indicating if the date is today
 */
export const isDateToday = (date: Date): boolean => {
  // Convert both dates to Luxon DateTime objects set to start of day
  const dt = DateTime.fromJSDate(date).startOf('day');
  const today = DateTime.now().startOf('day');
  
  // Compare dates
  return dt.equals(today);
};