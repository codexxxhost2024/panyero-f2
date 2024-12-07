import React from 'react';
import { LotteryBallProps } from './types';
import { getBallColor } from './styles/ballColors';
import { getReflectionGradient, getHighlightGradient } from './styles/gradients';
import { playTapSound } from '../../utils/sound';

export const LotteryBall: React.FC<LotteryBallProps> = ({
  number,
  isSelected,
  isDisabled,
  usage,
  onClick,
}) => {
  const numberValue = parseInt(number, 10);
  const baseColor = getBallColor(numberValue);
  
  const handleClick = () => {
    if (!isDisabled) {
      playTapSound();
      onClick();
    }
  };
  
  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isDisabled}
      className={`
        relative w-12 h-12 sm:w-14 sm:h-14 rounded-full 
        flex items-center justify-center
        transition-all duration-200 transform
        ${isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-800 scale-110' : 'hover:scale-105'}
        ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
        shadow-lg
      `}
      style={{
        background: getReflectionGradient(baseColor),
        boxShadow: `
          0 4px 6px rgba(0, 0, 0, 0.3),
          inset -2px -2px 6px rgba(0, 0, 0, 0.4),
          inset 2px 2px 6px rgba(255, 255, 255, 0.4)
        `,
      }}
    >
      {/* Highlight effect */}
      <div 
        className="absolute inset-0 rounded-full" 
        style={{ background: getHighlightGradient() }} 
      />
      
      {/* Number */}
      <span 
        className="relative text-white font-bold text-sm sm:text-base z-10"
        style={{ 
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          letterSpacing: '0.5px'
        }}
      >
        {number}
      </span>

      {/* Usage indicator */}
      {usage > 0 && (
        <div 
          className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center z-20"
          style={{
            background: 'linear-gradient(135deg, #FF4B4B, #FF0000)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.4)'
          }}
        >
          <span className="text-white text-[8px] sm:text-[10px] font-bold">
            {Math.round(usage * 100)}%
          </span>
        </div>
      )}
    </button>
  );
};