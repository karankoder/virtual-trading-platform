import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const appName: string = 'AlgoArena';

export const metadata: Metadata = {
  title: `${appName} - Virtual Trading Platform`,
  description:
    'Practice trading the Indian equity market with a ₹1,00,00,000 virtual corpus. Hone your skills with live NSE/BSE data, risk-free.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
