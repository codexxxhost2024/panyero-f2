import { DrawSchedule } from '../types/lottery';

// Convert time to Philippine time
const getPhilippineTime = (): Date => {
  const now = new Date();
  const philippineOffset = 8 * 60; // UTC+8
  const localOffset = now.getTimezoneOffset();
  return new Date(now.getTime() + (philippineOffset + localOffset) * 60000);
};

// Format time for comparison
const formatTimeForComparison = (date: Date): number => {
  return date.getHours() * 100 + date.getMinutes();
};

// Get available draw times based on current Philippine time
export const getAvailableDrawTimes = (): DrawSchedule[] => {
  const philippineTime = getPhilippineTime();
  const currentTime = formatTimeForComparison(philippineTime);

  const allDrawTimes: DrawSchedule[] = [
    { id: '11am', time: '11:00', label: '11:00 AM Draw', value: 1100 },
    { id: '4pm', time: '16:00', label: '4:00 PM Draw', value: 1600 },
    { id: '9pm', time: '21:00', label: '9:00 PM Draw', value: 2100 }
  ];

  return allDrawTimes.filter(draw => draw.value > currentTime);
};

// Check if any draws are available
export const hasAvailableDraws = (): boolean => {
  return getAvailableDrawTimes().length > 0;
};

// Get next draw time
export const getNextDrawTime = (): DrawSchedule | null => {
  const availableDraws = getAvailableDrawTimes();
  return availableDraws.length > 0 ? availableDraws[0] : null;
};