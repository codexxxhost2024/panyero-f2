import React from 'react';
import { Trophy } from 'lucide-react';

export function TopBanner() {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8" />
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl font-bold">Panyero F2</h1>
              <p className="text-sm opacity-90">Official Philippine Charity Sweepstakes Office Game</p>
            </div>
          </div>
          <div className="text-center sm:text-right">
            <p className="text-sm">Latest Draw Results:</p>
            <p className="font-mono text-xl sm:text-2xl font-bold">12-34</p>
          </div>
        </div>
      </div>
    </div>
  );
}