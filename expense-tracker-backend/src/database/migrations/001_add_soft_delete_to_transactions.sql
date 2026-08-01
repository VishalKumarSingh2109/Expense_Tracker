USE expense_tracker;

-- Adds soft-delete support to transactions.
-- Instead of removing rows, we mark them deleted so transaction
-- history stays intact for reports/audit purposes.
ALTER TABLE transactions
ADD COLUMN is_deleted TINYINT(1) NOT NULL DEFAULT 0;

-- Speeds up the WHERE is_deleted = 0 filter used on every query
ALTER TABLE transactions
ADD INDEX idx_user_deleted (user_id, is_deleted);