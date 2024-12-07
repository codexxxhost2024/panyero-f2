import React from 'react';

interface LotteryBallProps {
  number: string;
  isSelected: boolean;
  isDisabled: boolean;
  usage: number;
  onClick: () => void;
}

const getBallColor = (number: number): string => {
  if (number <= 20) return '#32CD32'; // Lime green
  if (number <= 40) return '#FFD700'; // Yellow
  if (number <= 60) return '#FF4444'; // Red
  if (number <= 80) return '#FF69B4'; // Pink
  return '#1E90FF'; // Blue
};

const getReflectionGradient = (baseColor: string): string => {
  return `linear-gradient(135deg, 
    ${baseColor} 0%,
    ${baseColor} 50%,
    ${adjustBrightness(baseColor, 20)} 51%,
    ${adjustBrightness(baseColor, 20)} 100%)`;
};

const adjustBrightness = (color: string, percent: number): string => {
  const lightenBy = (color: string): string => {
    const hex = color.replace('#', '');
    const r = Math.min(255, parseInt(hex.slice(0, 2), 16) + (percent / 100) * 255);
    const g = Math.min(255, parseInt(hex.slice(2, 4), 16) + (percent / 100) * 255);
    const b = Math.min(255, parseInt(hex.slice(4, 6), 16) + (percent / 100) * 255);
    return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
  };
  return lightenBy(color);
};

export function LotteryBall({ number, isSelected, isDisabled, usage, onClick }: LotteryBallProps) {
  const numberValue = parseInt(number, 10);
  const baseColor = getBallColor(numberValue);
  
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={`
        relative w-10 h-10 rounded-full flex items-center justify-center
        transition-all duration-200 transform hover:scale-105
        ${isSelected ? 'ring-2 ring-white ring-offset-2' : ''}
        ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
      `}
      style={{
        background: getReflectionGradient(baseColor),
        boxShadow: '2px 2px 5px rgba(0,0,0,0.2), inset -2px -2px 5px rgba(0,0,0,0.3), inset 2px 2px 5px rgba(255,255,255,0.3)',
      }}
    >
      <div className="absolute inset-0 rounded-full" style={{
        background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%)',
      }} />
      
      <span className="relative text-white font-bold text-sm" style={{
        textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
      }}>
        {number}
      </span>

      {usage > 0 && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center shadow-md">
          <span className="text-white text-[10px]">{Math.round(usage * 100)}%</span>
        </div>
      )}
    </button>
  );
}