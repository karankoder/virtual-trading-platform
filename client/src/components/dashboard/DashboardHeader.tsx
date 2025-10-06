import { useAuthStore } from '@/store/authStore';
import { Activity, Zap } from 'lucide-react';
import Link from 'next/link';

export default function DashboardHeader() {
  const { user } = useAuthStore();
  return (
    <div className='flex items-center justify-between'>
      <div>
        <h1 className='text-3xl font-bold text-[var(--color-foreground)] mb-2'>
          Welcome Back, {user?.username}! 👋
        </h1>
        <p className='text-[var(--color-muted)] flex items-center gap-2'>
          <Activity className='w-4 h-4 text-[var(--color-success)] animate-pulse' />
          Markets are open • Last updated: Just now
        </p>
      </div>
      <div className='flex gap-3'>
        <Link href='/trade'>
          <button className='flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white rounded-xl font-bold transition-all hover:shadow-lg hover:shadow-[var(--color-primary)]/25 hover:-translate-y-0.5'>
            <Zap className='w-5 h-5' />
            Quick Trade
          </button>
        </Link>
      </div>
    </div>
  );
}
