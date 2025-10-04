import { TrendingUp, BarChart3 } from 'lucide-react';

export default function PerformanceChart() {
  return (
    <div className='bg-surface rounded-xl border border-border p-6 shadow-sm'>
      <h2 className='text-xl font-bold text-foreground mb-4 flex items-center gap-2'>
        <TrendingUp className='w-5 h-5 text-primary' />
        Portfolio Performance
      </h2>
      <div className='bg-background rounded-xl border-2 border-dashed border-border h-80 flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-20 h-20 mx-auto mb-4 rounded-2xl bg-surface border border-border flex items-center justify-center'>
            <BarChart3 className='w-10 h-10 text-muted' />
          </div>
          <p className='text-foreground font-semibold text-lg mb-2'>
            Performance Chart
          </p>
          <p className='text-sm text-muted'>
            Historical portfolio value chart will be displayed here
          </p>
        </div>
      </div>
    </div>
  );
}
