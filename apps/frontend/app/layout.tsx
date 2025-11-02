import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DLXStudios.ai - AI Web Development',
  description: 'Create beautiful websites with AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
