"use client"
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

const metadata: Metadata = {
  title: 'Chatter',
  description: 'Chatter app',
};

export default function RootLayout({ children }: Readonly<ChatLayoutProps>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Box className="mx-auto flex h-screen w-screen justify-center bg-gray-900">
          <Box className="h-full w-4/12">{children}</Box>
        </Box>
      </body>
    </html>
  );
}

interface ChatLayoutProps {
  children: ReactNode;
}
