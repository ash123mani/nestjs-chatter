import React from 'react';
import { Message, User } from '@chatter-pwa/shared';
import { Box, Text } from '@chakra-ui/react';

export function Messages({ user, messages }: MessagesProps) {
  return (
    <Box className="w-ful flex h-4/6 flex-col-reverse overflow-y-scroll">
      {messages?.map((message, index) => {
        return (
          <Box
            key={index}
          >
            <Box className={determineMessageStyle(user, message.user.userId).sender}>
              <Text className="text-sm text-gray-400">{message.user.userName}</Text>
              <Text className="text-sm text-gray-400">{' ' + '•' + ' '}</Text>
              <Text className="text-sm text-gray-400">{message.timeSent}</Text>
            </Box>
            <Box className={determineMessageStyle(user, message.user.userId).message}>
              <Text className="text-white">{message.message}</Text>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

function determineMessageStyle(user: Pick<User, 'userId' | 'userName'>, messageUserId: string) {
  if (user && messageUserId === user.userId) {
    return {
      message: 'bg-slate-500 p-4 ml-24 mb-4 rounded break-words',
      sender: 'ml-24 pl-4',
    };
  } else {
    return {
      message: 'bg-slate-800 p-4 mr-24 mb-4 rounded break-words',
      sender: 'mr-24 pl-4',
    };
  }
};

interface MessagesProps {
  user: Pick<User, 'userId' | 'userName'>;
  messages: Message[];
}