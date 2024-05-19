"use client"
import { Box, Text } from '@chakra-ui/react';
import { useActor } from '@xstate/react';
import { wsChatMachine } from '@/app/chat/machines';

import { Header } from './components/Header'
import { Messages } from './components/Messages'
import { MessageForm } from './components/MessageForm'
import { LoginForm } from './components/LoginForm'

// TODO: Add the ChatLayout and LoginFormLayout
// TODO: Fix the type for the wsChatMachine
function Chat() {
  const [state, send] = useActor(wsChatMachine);
  let messages: any = [];
  let user: any = {
    userId: ''
  };
  const isConnected = state.matches("connected");

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