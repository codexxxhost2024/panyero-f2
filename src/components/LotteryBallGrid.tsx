import React from 'react';
import { LotteryBall } from './LotteryBall';
import type { BettingStats } from '../types/lottery';
import { WINNING_PRIZE, MAX_RISK_PERCENTAGE } from '../utils/constants';

interface LotteryBallGridProps {
  selectedNumbers: string[];
  onNumberSelect: (number: string) => void;
  bettingStats: BettingStats;
  position: 'first' | 'second';
}

export function LotteryBallGrid({ selectedNumbers, onNumberSelect, bettingStats, position }: LotteryBallGridProps) {
  const numbers = Array.from({ length: 99 }, (_, i) => String(i + 1).padStart(2, '0'));
  
  const getUsage = (number: string) => {
    const relevantCombinations = Object.entries(bettingStats).filter(([combination]) => {
      const [first, second] = combination.split('-');
      return position === 'first' ? first === number : second === number;
    });
    
    if (relevantCombinations.length === 0) return 0;
    
    const totalBets = relevantCombinations.reduce((sum, [_, stats]) => sum + stats.totalBets, 0);
    return (totalBets * WINNING_PRIZE) / (WINNING_PRIZE / MAX_RISK_PERCENTAGE);
  };

  return (
    <div className="grid grid-cols-10 gap-2 p-6 bg-gray-800 rounded-lg">
      {numbers.map((number) => {
        const usage = getUsage(number);
        const isDisabled = usage >= 1;
        const isSelected = selectedNumbers.includes(number);
        
        return (
          <LotteryBall
            key={number}
            number={number}
            isSelected={isSelected}
            isDisabled={isDisabled}
            usage={usage}
            onClick={() => onNumberSelect(number)}
          />
        );
      })}
    </div>
  );
}