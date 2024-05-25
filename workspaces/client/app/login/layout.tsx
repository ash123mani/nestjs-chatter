'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

const metadata: Metadata = {
  title: 'Login',
  description: 'Login app',
};

export default function RootLayout({ children }: Readonly<ChatLayoutProps>) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <Box className="mx-auto flex h-screen w-screen justify-center bg-gray-900">
      <Box className="flex h-full w-full flex-col px-2 md:w-8/12 lg:w-6/12 xl:w-4/12">
        {children}
      </Box>
    </Box>
    </body>
    </html>
  );
}

interface ChatLayoutProps {
  children: ReactNode;
}
