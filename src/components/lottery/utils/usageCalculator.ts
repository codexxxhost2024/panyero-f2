import { BettingStats } from '../types';
import { WINNING_PRIZE, MAX_RISK_PERCENTAGE } from '../../../utils/constants';

export const calculateBallUsage = (
  number: string,
  position: 'first' | 'second',
  bettingStats: BettingStats
): number => {
  const relevantCombinations = Object.entries(bettingStats).filter(([combination]) => {
    const [first, second] = combination.split('-');
    return position === 'first' ? first === number : second === number;
  });
  
  if (relevantCombinations.length === 0) return 0;
  
  const totalBets = relevantCombinations.reduce(
    (sum, [_, stats]) => sum + stats.totalBets, 
    0
  );
  
  return (totalBets * WINNING_PRIZE) / (WINNING_PRIZE / MAX_RISK_PERCENTAGE);
};