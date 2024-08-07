'use client';
import { Box } from '@chakra-ui/react';
import { useActor } from '@xstate/react';
import { io, Socket } from 'socket.io-client';
import { wsChatMachine } from '@/app/chat/machines';

import { Header } from './components/Header';
import { Messages } from './components/Messages';
import { MessageForm } from './components/MessageForm';
import { useEffect, useMemo, useState } from 'react';
import { ClientToServerEvents, ServerToClientEvents, User } from '@chatter-pwa/shared';
import { ChatMachineEvent, ChatMachineState } from '@/app/chat/machines/wsChatMachine';
import { useGetUser } from '@/app/hooks/useGetUser';
import { useRouter } from 'next/navigation';
import { useRoomQuery, unsetRoom } from '@/app/_lib/room';
import { UsersList } from '@/app/chat/components/UsersList';
import { getUser } from '@/app/_lib/user';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('ws://localhost:3001');

function Chat() {
  const router = useRouter();

  const [state, send] = useActor<typeof wsChatMachine>(wsChatMachine);
  const { messages } = state.context;
  const { user, roomName } = useGetUser();
  const isConnected = state.matches(ChatMachineState.Connected);
  const [toggleUserList, setToggleUserList] = useState<boolean>(false);

  const { data: room } = useRoomQuery(roomName!, isConnected);


  useEffect(() => {
    if (!user || !roomName) {
      router.push('/login');
    } else {
      socket.on('connect', () => {
        socket.emit('join_room', {
          roomName,
          user: {
            userId: user.userId!,
            userName: user.userName!,
            socketId: socket.id!,
          },
        });
        send({ type: ChatMachineEvent.Connect });
      });
      socket.on('disconnect', () => {
        send({ type: ChatMachineEvent.Disconnect });
      });
      socket.on('chat', (e) => {
        send({ type: ChatMachineEvent.SendMessage, payload: e });
      });

      socket.connect();
    }

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('chat');
    };
  }, [user, roomName, send, router]);

  const memoedUser = useMemo(()=> ({
    userName: user?.userName!, userId: user?.userId!
  }), [user?.userName,  user?.userId]);

  return (
    <Box>
      {user?.userId && user?.userName && roomName && room && <Box>
        <Header
          users={room?.users ?? []}
          isConnected={isConnected}
          roomName={roomName!}
          onUsersClick={handleToggleUserList}
          onLeaveRoom={handleLeaveRoom}
        ></Header>
        {toggleUserList ? (
          <UsersList room={room}></UsersList>
        ) : (
          <Messages user={memoedUser!} messages={messages} />
        )}
        <MessageForm sendMessage={sendMessage}></MessageForm>
      </Box>}
    </Box>
  );

  function sendMessage(message: string) {
    if (user && socket && roomName) {
      socket.emit('chat', {
        user: {
          userId: user.userId!,
          userName: user.userName!,
          socketId: socket.id!,
        },
        timeSent: new Date(Date.now()).toLocaleString('en-US'),
        message: message,
        roomName: roomName,
      });
    }
  }

  function handleToggleUserList() {
    setToggleUserList((toggleUserList) => !toggleUserList);
  }


  function handleLeaveRoom() {
    socket.disconnect();
    unsetRoom();
    router.replace('/');
  }
}

export default Chat;