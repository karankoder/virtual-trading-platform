import {
  TrendingUp,
  TrendingDown,
  Wallet,
  PieChart,
  DollarSign,
} from 'lucide-react';

type PortfolioStatsProps = {
  stats: {
    label: string;
    value: number;
    icon: React.ElementType;
    color: 'primary' | 'success' | 'danger';
    isReturn?: boolean;
    isCount?: boolean;
  }[];
  totalPLPercent: number;
};

export default function PortfolioStats({
  stats,
  totalPLPercent,
}: PortfolioStatsProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
      {stats.map((stat) => {
        const Icon = stat.icon;
        const valueColorClass = `text-${stat.color}`;
        const bgColorClass = `bg-${stat.color}/10`;

        return (
          <div
            key={stat.label}
            className='bg-surface rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow'
          >
            <div className='flex items-center justify-between mb-4'>
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${bgColorClass}`}
              >
                <Icon className={`w-6 h-6 ${valueColorClass}`} />
              </div>
            </div>
            <p className='text-sm text-muted mb-2 font-medium'>{stat.label}</p>
            <p
              className={`text-2xl font-bold ${
                stat.isReturn ? valueColorClass : 'text-foreground'
              }`}
            >
              {stat.isCount
                ? stat.value
                : stat.isReturn
                ? `${stat.value >= 0 ? '+' : ''}₹${Math.abs(
                    stat.value
                  ).toLocaleString('en-IN')}`
                : `₹${stat.value.toLocaleString('en-IN')}`}
            </p>
            {stat.isReturn && (
              <p className={`text-sm font-semibold mt-1 ${valueColorClass}`}>
                {totalPLPercent >= 0 ? '+' : ''}
                {totalPLPercent.toFixed(2)}%
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
