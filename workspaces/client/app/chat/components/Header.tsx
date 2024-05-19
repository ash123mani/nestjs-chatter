import React from 'react';
import { User } from '@chatter-pwa/shared';
import { Box, Text } from '@chakra-ui/react';

export function Header({ user, isConnected }: HeaderProps) {
  return (
    <Box className="flex h-1/6 items-center justify-between">
      <Text as="h1" className="text-5xl font-black text-violet-500">Realtime Chat</Text>
      <Box className="flex h-8 items-center rounded-xl bg-slate-800 px-4">
        <Text as="span" className="mr-1 text-lg text-white">{user.userName ?? ''}</Text>
        <Text as="span" className="ml-1">{isConnected ? '🟢' : '🔴'}</Text>
      </Box>
    </Box>
  );
};

interface HeaderProps {
  user: User;
  isConnected: boolean;
}