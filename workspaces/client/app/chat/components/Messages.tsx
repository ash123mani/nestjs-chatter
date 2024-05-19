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
            className={determineMessageStyle(user, message.user.userId)}
          >
            <Text as="span" className="text-sm text-gray-400">
              {message.user.userName}
            </Text>
            <Text as="span" className="text-sm text-gray-400">{' ' + '•' + ' '}</Text>
            <Text as="span" className="text-sm text-gray-400">{message.timeSent}</Text>
            <Text as="p" className="text-white">{message.message}</Text>
          </Box>
        );
      })}
    </Box>
  );
};

function determineMessageStyle(user: User, messageUserId: string) {
  if (user && messageUserId === user.userId) {
    return 'bg-violet-900 p-4 ml-24 mb-4 rounded';
  } else {
    return 'bg-slate-700 p-4 mr-24 mb-4 rounded';
  }
};

interface MessagesProps {
  user: User;
  messages: Message[];
}