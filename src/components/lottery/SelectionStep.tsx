import React from 'react';
import { LotteryBallGrid } from './LotteryBallGrid';
import { SelectedBall } from './SelectedBall';
import { DrawTimeSelect } from './DrawTimeSelect';
import { BetInput } from '../BetInput';
import { BettingStats } from './types';
import { hasAvailableDraws } from '../../utils/timeUtils';

interface SelectionStepProps {
  firstNumber: string | null;
  secondNumber: string | null;
  selectedTime: string;
  onSelectNumber: (position: 'first' | 'second', number: string) => void;
  onTimeSelect: (time: string) => void;
  onBetSubmit: (amount: number) => void;
  bettingStats: BettingStats;
  walletBalance: number;
}

export const SelectionStep: React.FC<SelectionStepProps> = ({
  firstNumber,
  secondNumber,
  selectedTime,
  onSelectNumber,
  onTimeSelect,
  onBetSubmit,
  bettingStats,
  walletBalance,
}) => {
  const currentPosition = !firstNumber ? 'first' : 'second';
  const showBetInput = firstNumber && secondNumber && hasAvailableDraws();
  
  if (!hasAvailableDraws() && !showBetInput) {
    return (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
        <p className="text-yellow-700">
          No more draws available for today. Please come back tomorrow.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Display selected numbers */}
      <div className="space-y-2 sm:space-y-4">
        {firstNumber && (
          <SelectedBall number={firstNumber} position="first" />
        )}
        {secondNumber && (
          <SelectedBall number={secondNumber} position="second" />
        )}
      </div>

      {/* Draw time selection */}
      {showBetInput && (
        <DrawTimeSelect
          selectedTime={selectedTime}
          onTimeSelect={onTimeSelect}
        />
      )}

      {/* Bet input or selection grid */}
      {showBetInput ? (
        <BetInput
          onBetSubmit={onBetSubmit}
          minBet={10}
          walletBalance={walletBalance}
        />
      ) : (
        <div>
          <h3 className="text-lg font-semibold text-white mb-2 sm:mb-4 px-2">
            Select {currentPosition === 'first' ? 'First' : 'Second'} Number
          </h3>
          <LotteryBallGrid
            selectedNumbers={[]}
            onNumberSelect={(number) => onSelectNumber(currentPosition, number)}
            bettingStats={bettingStats}
            position={currentPosition}
          />
        </div>
      )}
    </div>
  );
};