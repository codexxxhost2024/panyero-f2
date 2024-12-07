import { useState, useEffect } from 'react';
import { getDrawInfo } from '../utils/api';
import type { DrawSchedule } from '../types/lottery';

export function useDrawTimes() {
  const [availableDraws, setAvailableDraws] = useState<DrawSchedule[]>([]);
  const [latestResults, setLatestResults] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDrawInfo = async () => {
      try {
        setLoading(true);
        const { availableDraws, latestResults } = await getDrawInfo();
        setAvailableDraws(availableDraws);
        setLatestResults(latestResults?.winning_numbers || null);
      } catch (err) {
        setError('Failed to fetch draw information');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDrawInfo();
    const interval = setInterval(fetchDrawInfo, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, []);

  return {
    availableDraws,
    latestResults,
    loading,
    error
  };
}