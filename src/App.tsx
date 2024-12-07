import React, { useState, useCallback } from 'react';
import { BetConfirmation } from './components/BetConfirmation';
import { TopBanner } from './components/TopBanner';
import { WalletBalance } from './components/WalletBalance';
import { BetReceipt } from './components/BetReceipt';
import { BetHistory } from './components/BetHistory';
import { SelectionStep } from './components/lottery/SelectionStep';
import { SuccessPage } from './components/SuccessPage';
import { WINNING_PRIZE, MAX_RISK_PERCENTAGE, INITIAL_WALLET_BALANCE } from './utils/constants';
import type { BettingStats, Bet } from './types/lottery';

function App() {
  const [bettingStats, setBettingStats] = useState<BettingStats>({});
  const [walletBalance, setWalletBalance] = useState(INITIAL_WALLET_BALANCE);
  const [pendingBet, setPendingBet] = useState<Bet | null>(null);
  const [confirmedBet, setConfirmedBet] = useState<Bet | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [bets, setBets] = useState<Bet[]>([]);
  const [firstNumber, setFirstNumber] = useState<string | null>(null);
  const [secondNumber, setSecondNumber] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState('11am'); // Default to first draw

  const handleNumberSelect = useCallback((position: 'first' | 'second', number: string) => {
    if (position === 'first') {
      setFirstNumber(number);
    } else {
      setSecondNumber(number);
    }
  }, []);

  const handleTimeSelect = useCallback((time: string) => {
    setSelectedTime(time);
  }, []);

  const handleBetSubmit = useCallback((amount: number) => {
    if (!firstNumber || !secondNumber) return;
    
    const combination = `${firstNumber}-${secondNumber}`;
    handleBet(combination, selectedTime, amount);
  }, [firstNumber, secondNumber, selectedTime]);

  const handleBet = useCallback((combination: string, drawTime: string, amount: number) => {
    if (walletBalance < amount) {
      alert('Insufficient wallet balance');
      return;
    }

    const bet: Bet = {
      id: Math.random().toString(36).substr(2, 9),
      combination,
      drawTime,
      amount,
      potentialWin: amount * (WINNING_PRIZE / 10),
      timestamp: new Date(),
      status: 'pending'
    };

    setPendingBet(bet);
  }, [walletBalance]);

  const handleConfirmBet = useCallback(() => {
    if (!pendingBet) return;

    setBettingStats((prev) => {
      const currentStats = prev[pendingBet.combination] || { totalBets: 0, isOpen: true };
      const newTotalBets = currentStats.totalBets + 1;
      const isOpen = (newTotalBets * WINNING_PRIZE) <= (WINNING_PRIZE / MAX_RISK_PERCENTAGE);

      return {
        ...prev,
        [pendingBet.combination]: {
          totalBets: newTotalBets,
          isOpen,
        },
      };
    });

    setWalletBalance(prev => prev - pendingBet.amount);
    
    const confirmedBet = { ...pendingBet, status: 'confirmed' as const };
    setBets(prev => [confirmedBet, ...prev]);
    setConfirmedBet(confirmedBet);
    setPendingBet(null);
    setShowSuccess(true);
    
    // Reset selection
    setFirstNumber(null);
    setSecondNumber(null);
    setSelectedTime('11am');
  }, [pendingBet]);

  const handleSuccessComplete = useCallback(() => {
    setShowSuccess(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <TopBanner />
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <WalletBalance balance={walletBalance} />
        
        <SelectionStep
          firstNumber={firstNumber}
          secondNumber={secondNumber}
          selectedTime={selectedTime}
          onSelectNumber={handleNumberSelect}
          onTimeSelect={handleTimeSelect}
          onBetSubmit={handleBetSubmit}
          bettingStats={bettingStats}
          walletBalance={walletBalance}
        />
        
        <BetHistory bets={bets} />
        
        {pendingBet && (
          <BetConfirmation
            bet={pendingBet}
            onConfirm={handleConfirmBet}
            onCancel={() => {
              setPendingBet(null);
              setFirstNumber(null);
              setSecondNumber(null);
              setSelectedTime('11am');
            }}
          />
        )}
        
        {showSuccess && confirmedBet && (
          <SuccessPage
            bet={confirmedBet}
            onComplete={handleSuccessComplete}
          />
        )}
        
        {confirmedBet && !showSuccess && (
          <BetReceipt
            bet={confirmedBet}
            onClose={() => setConfirmedBet(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;