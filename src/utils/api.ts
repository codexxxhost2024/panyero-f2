import { DrawSchedule } from '../types/lottery';

const API_BASE = '/.netlify/functions';

export async function getDrawInfo() {
  const response = await fetch(`${API_BASE}/draws`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch draw information');
  }

  const data = await response.json();
  return {
    availableDraws: data.availableDraws as DrawSchedule[],
    latestResults: data.latestResults,
    currentTime: data.currentTime
  };
}

export async function placeBet(bet: {
  combination: string;
  drawTime: string;
  amount: number;
}) {
  const response = await fetch(`${API_BASE}/bets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bet),
  });

  if (!response.ok) {
    throw new Error('Failed to place bet');
  }

  return response.json();
}

export async function getBets() {
  const response = await fetch(`${API_BASE}/bets`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch bets');
  }

  return response.json();
}