'use client';

import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import { useSidebar } from '@/contexts/SidebarContext';

interface DashboardLayoutProps {
  children: ReactNode;
  user?: {
    name: string;
    email: string;
  };
  portfolio?: {
    totalValue: number;
    cash: number;
    totalPL: number;
    plPercentage: number;
  };
}

const DashboardLayout = ({
  children,
  user = {
    name: 'Karan Kumar Das',
    email: 'karan@gmail.com',
  },
  portfolio = {
    totalValue: 1250000,
    cash: 500000,
    totalPL: 125000,
    plPercentage: 11.11,
  },
}: DashboardLayoutProps) => {
  const { isCollapsed } = useSidebar();

  return (
    <div className='min-h-screen bg-[var(--color-background)]'>
      {/* Sidebar */}
      <Sidebar user={user} portfolio={portfolio} />

      {/* Main Content Area - Responsive to sidebar state */}
      <main
        className={`transition-all duration-300 min-h-screen ${
          isCollapsed ? 'ml-20' : 'ml-80'
        }`}
      >
        {/* Content Container with padding */}
        <div className='p-8 max-w-[1800px] mx-auto'>{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
