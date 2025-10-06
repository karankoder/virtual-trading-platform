import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { appName } from '@/lib/constants';
import { SidebarProvider } from '@/contexts/SidebarContext';
import { Toaster } from 'sonner';
import AuthInitializer from '@/components/common/AuthInitializer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: ` ${appName} - Virtual Trading Platform`,
  description:
    'Practice stock trading on the Indian market with a ₹1 Crore virtual portfolio. No risk, all reward.',
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} bg-background text-foreground font-sans`}
      >
        <SidebarProvider>
          <AuthInitializer />
          {children}
        </SidebarProvider>
        <Toaster
          richColors
          theme='dark'
          toastOptions={{
            classNames: {
              toast: 'bg-surface border-border text-text-primary',
              title: 'text-text-primary',
              description: 'text-text-secondary',
              actionButton: 'bg-primary text-background',
              cancelButton: 'bg-surface hover:bg-background',
              success: '[&>svg]:text-green-500',
              error: '[&>svg]:text-red-500',
              loading: '!bg-surface !border-primary !text-text-primary',
            },
          }}
        />
      </body>
    </html>
  );
}
