// Formats an ISO date string / Date into "DD MMM YYYY", e.g. "15 Jul 2026"
// Reads only the date part to avoid timezone shift issues from the backend.
export function formatDate(dateInput) {
    if (!dateInput) return '';
    const isoString = typeof dateInput === 'string' ? dateInput : dateInput.toISOString();
    const datePart = isoString.split('T')[0]; // "2026-07-15"
    const [year, month, day] = datePart.split('-');

    const MONTH_NAMES = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];

    return `${parseInt(day)} ${MONTH_NAMES[parseInt(month) - 1]} ${year}`;
}

// Converts any date input into "YYYY-MM-DD" for <input type="date"> values
export function toInputDateFormat(dateInput) {
    if (!dateInput) return '';
    const isoString = typeof dateInput === 'string' ? dateInput : dateInput.toISOString();
    return isoString.split('T')[0];
}