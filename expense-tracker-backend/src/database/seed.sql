USE expense_tracker;

-- Default global categories (user_id = NULL means available to everyone)
INSERT INTO categories (user_id, name, type) VALUES
(NULL, 'Salary', 'income'),
(NULL, 'Freelance', 'income'),
(NULL, 'Business', 'income'),
(NULL, 'Other Income', 'income'),
(NULL, 'Food & Dining', 'expense'),
(NULL, 'Groceries', 'expense'),
(NULL, 'Transportation', 'expense'),
(NULL, 'Rent', 'expense'),
(NULL, 'Utilities', 'expense'),
(NULL, 'Entertainment', 'expense'),
(NULL, 'Healthcare', 'expense'),
(NULL, 'Shopping', 'expense'),
(NULL, 'Education', 'expense'),
(NULL, 'Other Expense', 'expense');
