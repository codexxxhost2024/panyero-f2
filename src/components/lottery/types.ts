export interface BallColorRange {
  max: number;
  color: string;
  name: string;
}

export interface LotteryBallProps {
  number: string;
  isSelected: boolean;
  isDisabled: boolean;
  usage: number;
  onClick: () => void;
}

export interface LotteryBallGridProps {
  selectedNumbers: string[];
  onNumberSelect: (number: string) => void;
  bettingStats: BettingStats;
  position: 'first' | 'second';
}

export interface BettingStats {
  [key: string]: {
    totalBets: number;
    isOpen: boolean;
  };
}