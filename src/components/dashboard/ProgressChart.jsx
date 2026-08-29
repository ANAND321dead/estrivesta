import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Area, AreaChart,
} from 'recharts';

const sessionData = [
  { session: 'S1', date: '15 Jul', score: 58 },
  { session: 'S2', date: '18 Jul', score: 62 },
  { session: 'S3', date: '22 Jul', score: 60 },
  { session: 'S4', date: '26 Jul', score: 65 },
  { session: 'S5', date: '29 Jul', score: 68 },
  { session: 'S6', date: '02 Aug', score: 66 },
  { session: 'S7', date: '06 Aug', score: 71 },
  { session: 'S8', date: '09 Aug', score: 73 },
  { session: 'S9', date: '12 Aug', score: 76 },
  { session: 'S10', date: '14 Aug', score: 79 },
];

function CustomTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;
  const data = payload[0].payload;
  return (
    <div className="bg-bg-elevated border border-border rounded-[8px] px-3 py-2 shadow-lg">
      <p className="text-text-muted text-xs mb-1">{data.date}</p>
      <p className="text-white text-sm font-semibold">
        Score: <span className="text-accent-violet">{data.score}</span>
      </p>
    </div>
  );
}

export default function ProgressChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={sessionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6C63FF" stopOpacity={0.2} />
            <stop offset="100%" stopColor="#6C63FF" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#1E1E2E"
          vertical={false}
        />
        <XAxis
          dataKey="session"
          stroke="#555570"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          domain={[0, 100]}
          stroke="#555570"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ stroke: '#6C63FF', strokeWidth: 1, strokeDasharray: '4 4' }}
        />
        <Area
          type="monotone"
          dataKey="score"
          stroke="#6C63FF"
          strokeWidth={2.5}
          fill="url(#scoreGradient)"
          dot={{ fill: '#6C63FF', stroke: '#F0F0FF', strokeWidth: 2, r: 4 }}
          activeDot={{
            r: 7,
            fill: '#6C63FF',
            stroke: '#F0F0FF',
            strokeWidth: 2,
            style: { filter: 'drop-shadow(0 0 6px rgba(108,99,255,0.6))' },
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
