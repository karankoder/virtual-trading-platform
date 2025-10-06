'use client';

import DashboardHeader from '@/components/dashboard/DashboardHeader';
import LeftDashboard from '@/components/dashboard/LeftDashboard';
import PortfolioOverview from '@/components/dashboard/PortfolioOverview';
import RightDashboard from '@/components/dashboard/RightDashboard';

export default function DashboardPage() {
  return (
    <div className='space-y-6'>
      <DashboardHeader />

      <PortfolioOverview />

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <LeftDashboard />

        <RightDashboard />
      </div>
    </div>
  );
}
