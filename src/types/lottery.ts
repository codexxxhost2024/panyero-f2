export interface DrawSchedule {
  id: string;
  time: string;
  label: string;
  value: number;
}

export interface BetCombination {
  firstNumber: string;
  secondNumber: string;
}

export interface BetStats {
  totalBets: number;
  isOpen: boolean;
}

export interface Wallet {
  balance: number;
}

export interface Bet {
  id: string;
  combination: string;
  drawTime: string;
  amount: number;
  potentialWin: number;
  timestamp: Date;
  status: 'pending' | 'confirmed' | 'completed';
}

export type BettingStats = Record<string, BetStats>;