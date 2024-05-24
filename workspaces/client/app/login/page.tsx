'use client';
import React, { Fragment, useEffect, useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { Rooms } from './components/Rooms';
import { useRoomsQuery } from '../_lib/chat'
import { generateUserId, getUser, setUser } from '@chatter-pwa/client/app/_lib/user'
import { useGetUser } from '@/app/hooks/useGetUser';
import { useRouter } from 'next/router';

function Login() {
  const router = useRouter()

  const [joinRoomSelection, setJoinRoomSelection] = useState<string>('')
  const { data: rooms, isLoading: roomsLoading } = useRoomsQuery()
  const { user, roomName } = useGetUser()

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    const userFormValue = (e.target as any)[0].value;
    const roomFormValue = (e.target as any)[1].value;
    const newUser = {
      userId: generateUserId(userFormValue),
      userName: userFormValue,
    }
    setUser({ id: newUser.userId, name: newUser.userName })
    if (joinRoomSelection !== '') {
      sessionStorage.setItem('room', joinRoomSelection)
    } else {
      sessionStorage.setItem('room', roomFormValue)
    }
    router.push('/chat')
  }

  useEffect(() => {
    if (user?.userId && roomName) {
      router.replace('/chat')
    }
  }, [])

  return (
    <Fragment>
      <Rooms
        rooms={rooms ?? []}
        selectionHandler={setJoinRoomSelection}
        selectedRoom={joinRoomSelection}
        isLoading={roomsLoading}
      ></Rooms>
      <LoginForm
        defaultUser={user?.userName!}
        disableNewRoom={joinRoomSelection !== ''}
        login={login}
      ></LoginForm>
    </Fragment>
  )
}


export default Login
