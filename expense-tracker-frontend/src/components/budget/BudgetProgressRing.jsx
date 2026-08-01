// Circular ring progress indicator - used on the Dashboard summary card.
// Uses SVG stroke-dasharray to draw the ring; color follows alertLevel.
export default function BudgetProgressRing({ percentUsed, alertLevel, size = 120 }) {
    const strokeWidth = 12;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const clampedPercent = Math.min(percentUsed, 100);
    const offset = circumference - (clampedPercent / 100) * circumference;

    const colorMap = {
        ok: 'var(--color-success)',
        warning: 'var(--color-warning)',
        exceeded: 'var(--color-danger)',
    };
    const ringColor = colorMap[alertLevel] || 'var(--color-text-muted)';

    return (
        <div className="budget-ring-wrapper" style={{ width: size, height: size }}>
            <svg width={size} height={size}>
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="var(--color-border)"
                    strokeWidth={strokeWidth}
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={ringColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                    style={{ transition: 'stroke-dashoffset 0.4s ease' }}
                />
            </svg>
            <div className="budget-ring-label">
                <span className="budget-ring-percent">{percentUsed}%</span>
                <span className="budget-ring-caption">used</span>
            </div>
        </div>
    );
}