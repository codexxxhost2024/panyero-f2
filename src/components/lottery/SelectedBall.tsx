import React from 'react';
import { LotteryBall } from './LotteryBall';

interface SelectedBallProps {
  number: string;
  position: 'first' | 'second';
}

export const SelectedBall: React.FC<SelectedBallProps> = ({ number, position }) => {
  return (
    <div className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 bg-gray-700 rounded-lg">
      <span className="text-white text-sm sm:text-base font-medium">
        {position === 'first' ? 'First' : 'Second'} Number:
      </span>
      <LotteryBall
        number={number}
        isSelected={true}
        isDisabled={false}
        usage={0}
        onClick={() => {}} // No action needed for display
      />
    </div>
  );
};