export default function SearchFilterBar({ filters, categories, onChange, onReset }) {
    function handleFieldChange(field, value) {
        onChange({ ...filters, [field]: value, page: 1 }); // reset to page 1 on any filter change
    }

    return (
        <div className="filter-bar">
            <input
                type="text"
                placeholder="Search description..."
                value={filters.search}
                onChange={(e) => handleFieldChange('search', e.target.value)}
                className="filter-search"
            />

            <select value={filters.type} onChange={(e) => handleFieldChange('type', e.target.value)}>
                <option value="">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
            </select>

            <select value={filters.categoryId} onChange={(e) => handleFieldChange('categoryId', e.target.value)}>
                <option value="">All Categories</option>
                {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.name}
                    </option>
                ))}
            </select>

            <input
                type="date"
                value={filters.startDate}
                onChange={(e) => handleFieldChange('startDate', e.target.value)}
                title="Start date"
            />
            <input
                type="date"
                value={filters.endDate}
                onChange={(e) => handleFieldChange('endDate', e.target.value)}
                title="End date"
            />

            <input
                type="number"
                placeholder="Min ₹"
                value={filters.minAmount}
                onChange={(e) => handleFieldChange('minAmount', e.target.value)}
                className="filter-amount"
            />
            <input
                type="number"
                placeholder="Max ₹"
                value={filters.maxAmount}
                onChange={(e) => handleFieldChange('maxAmount', e.target.value)}
                className="filter-amount"
            />

            <button className="btn-secondary" onClick={onReset}>
                Reset
            </button>
        </div>
    );
}