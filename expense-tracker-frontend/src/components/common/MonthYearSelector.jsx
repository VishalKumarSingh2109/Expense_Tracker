const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

// Reusable month/year picker - used on Budget page and Reports page
export default function MonthYearSelector({ month, year, onChange }) {
    const currentYear = new Date().getFullYear();
    const years = [currentYear - 1, currentYear, currentYear + 1];

    return (
        <div className="month-year-selector">
            <select value={month} onChange={(e) => onChange({ month: parseInt(e.target.value), year })}>
                {MONTH_NAMES.map((name, index) => (
                    <option key={name} value={index + 1}>
                        {name}
                    </option>
                ))}
            </select>

            <select value={year} onChange={(e) => onChange({ month, year: parseInt(e.target.value) })}>
                {years.map((y) => (
                    <option key={y} value={y}>
                        {y}
                    </option>
                ))}
            </select>
        </div>
    );
}