'use client';

import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';


export default function RootLayout({ children }: Readonly<ChatLayoutProps>) {
  return (

    <Box className="mx-auto flex h-screen w-screen justify-center bg-gray-900">
      <Box className="h-full w-4/12">{children}</Box>
    </Box>
  );
}

interface ChatLayoutProps {
  children: ReactNode;
}
