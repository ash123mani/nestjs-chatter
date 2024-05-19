"use client"
import { Box, Text } from '@chakra-ui/react';
import { useActor } from '@xstate/react';
import { io, Socket } from 'socket.io-client'
import { wsChatMachine } from '@/app/chat/machines';

import { Header } from './components/Header'
import { Messages } from './components/Messages'
import { MessageForm } from './components/MessageForm'
import { LoginForm } from './components/LoginForm'
import { useEffect } from 'react';
import { ServerToClientEvents, ClientToServerEvents } from '@chatter-pwa/shared';
import { ChatMachineEvent, ChatMachineState } from '@/app/chat/machines/wChatMachine';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();
function Chat() {
  const [state, send] = useActor<typeof wsChatMachine>(wsChatMachine);
  const { messages, user } = state.context;
  const isConnected = state.matches(ChatMachineState.Connected);

  useEffect(() => {
    socket.on('connect', () => {
      send({ type: ChatMachineEvent.Connect })
    });

    socket.on('disconnect', () => {
      send({ type: ChatMachineEvent.Disconnect })
    });

    socket.on('chat', () => {
      // Send the SendMessage Event
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('chat');
    };
  }, [send]);

  return (
    <Box>
      <Text fontSize='6xl'>(6xl) In love with React & Next</Text>
      <>
        {user && user.userId ? (
          <>
            <Header user={user} isConnected={isConnected}></Header>
            <Messages user={user} messages={messages}></Messages>
            <MessageForm sendMessage={sendMessage}></MessageForm>
          </>
        ) : (
          <>
            <LoginForm login={login}></LoginForm>
          </>
        )}
      </>
    </Box>
  )

  function sendMessage() {}

  function login() {}
}

export default Chat