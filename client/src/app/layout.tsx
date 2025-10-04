import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { appName } from '@/lib/constants';
import { SidebarProvider } from '@/contexts/SidebarContext';

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
        <SidebarProvider>{children}</SidebarProvider>
      </body>
    </html>
  );
}
