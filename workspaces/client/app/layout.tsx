import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { Providers } from './providers';
import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Chatter Home',
  description: 'Chatter for chatting',
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <Providers>
      <Box>
        {children}
      </Box>
    </Providers>
    </body>
    </html>
  );
}

interface RootLayoutProps {
  children: ReactNode;
}
