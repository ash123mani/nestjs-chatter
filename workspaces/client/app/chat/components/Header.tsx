import React from 'react';
import { User } from '@chatter-pwa/shared';
import { Box, Button, Text } from '@chakra-ui/react';

export function Header({ isConnected, users, onUsersClick, onLeaveRoom, roomName }: HeaderProps) {
  return (
    <header className="flex h-1/6 flex-col pt-12">
      <Box className="flex justify-between">
        <Box className="flex h-8 items-center">
          <Text className="ml-1">{isConnected ? '🟢' : '🔴'}</Text>
          <Text className="px-2 text-3xl text-white">{'/'}</Text>
          <Text className=" text-white">{roomName}</Text>
        </Box>
        <Box className="flex">
          <Button
            onClick={() => onUsersClick()}
            className="ml-1 flex h-8 items-center rounded-xl bg-gray-800 px-4"
          >
            <Text className="mr-1 text-lg text-white">{'👨‍💻'}</Text>
            <Text className="ml-1 text-white">{users.length}</Text>
          </Button>
          <Button
            onClick={() => onLeaveRoom()}
            className="ml-1 flex h-8 items-center rounded-xl bg-gray-800 px-4"
          >
            <span className="mr-1 text-white">{'Leave'}</span>
          </Button>
        </Box>
      </Box>
    </header>
  );
};

interface HeaderProps {
  isConnected: boolean;
  users: User[];
  onUsersClick: () => void;
  onLeaveRoom: () => void;
  roomName: string;
}