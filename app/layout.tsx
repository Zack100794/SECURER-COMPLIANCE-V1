import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SECURER-COMPLIANCE V1',
  description: 'Next.js UI for cybersecurity requirements capture and regulatory analysis.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
