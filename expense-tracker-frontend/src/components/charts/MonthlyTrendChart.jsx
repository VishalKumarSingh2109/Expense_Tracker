import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../utils/formatCurrency';

export default function MonthlyTrendChart({ data }) {
    return (
        <ResponsiveContainer width="100%" height={320}>
            <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="income"
                    stroke="var(--color-success)"
                    strokeWidth={2}
                    name="Income"
                    dot={{ r: 3 }}
                />
                <Line
                    type="monotone"
                    dataKey="expense"
                    stroke="var(--color-danger)"
                    strokeWidth={2}
                    name="Expense"
                    dot={{ r: 3 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}