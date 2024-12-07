import React from 'react';
import { DRAW_SCHEDULES } from '../utils/constants';

interface DrawScheduleSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function DrawScheduleSelect({ value, onChange }: DrawScheduleSelectProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Draw Schedule
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="">Select Draw Time</option>
        {DRAW_SCHEDULES.map((schedule) => (
          <option key={schedule.id} value={schedule.id}>
            {schedule.label}
          </option>
        ))}
      </select>
    </div>
  );
}