-- Draw Results Table
CREATE TABLE IF NOT EXISTS draw_results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  draw_time DATETIME NOT NULL,
  winning_numbers VARCHAR(5) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Bets Table
CREATE TABLE IF NOT EXISTS bets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  combination VARCHAR(5) NOT NULL,
  draw_time VARCHAR(10) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  user_id VARCHAR(50),
  status VARCHAR(20) DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_draw_time ON draw_results(draw_time);
CREATE INDEX IF NOT EXISTS idx_bet_draw_time ON bets(draw_time);
CREATE INDEX IF NOT EXISTS idx_bet_status ON bets(status);