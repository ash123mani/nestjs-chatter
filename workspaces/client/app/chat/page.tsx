'use client';
import { Box, Text } from '@chakra-ui/react';
import { useActor } from '@xstate/react';
import { io, Socket } from 'socket.io-client';
import { wsChatMachine } from '@/app/chat/machines';

import { Header } from './components/Header';
import { Messages } from './components/Messages';
import { MessageForm } from './components/MessageForm';
import { LoginForm } from '../login/components/LoginForm';
import { FormEvent, useEffect } from 'react';
import { ClientToServerEvents, ServerToClientEvents } from '@chatter-pwa/shared';
import { ChatMachineEvent, ChatMachineState } from '@/app/chat/machines/wsChatMachine';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("ws://localhost:3001");
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

    socket.on('chat', (e) => {
      send({ type: ChatMachineEvent.SendMessage, payload: e })
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('chat');
    };
  }, [send]);

  return (
    <Box>
            <Header user={user!} isConnected={isConnected}></Header>
            <Messages user={user!} messages={messages}></Messages>
            <MessageForm sendMessage={sendMessage}></MessageForm>
    </Box>
  )

  function sendMessage(e: FormEvent<HTMLFormElement>) {
    if (user) {
      socket.emit('chat', {
        user: {
          userId: user.userId,
          userName: user.userName,
          socketId: '9999999999999999999999'
        },
        timeSent: new Date(Date.now()).toLocaleString('en-US'),
        message: (e.target as any)[0].value,
        roomName: 'FAKEFAKEFAKEFAKEFAKEFAKE'
      });
    }
  }

  function login(e: FormEvent<HTMLFormElement>) {
    const formValue = (e.target as any)[0].value;
    const newUser = {
      userId: Date.now().toLocaleString().concat(formValue),
      userName: formValue,
    };
    sessionStorage.setItem('user', JSON.stringify(newUser));
  }
}

export default Chat