USE expense_tracker;

-- Tracks whether a savings goal is still being worked toward or
-- has been fully funded. Auto-set to 'completed' when saved_amount
-- reaches target_amount (handled in application logic).
ALTER TABLE savings_goals
ADD COLUMN status ENUM('active', 'completed') NOT NULL DEFAULT 'active';