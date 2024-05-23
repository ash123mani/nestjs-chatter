import { assign, setup } from "xstate";
import {
  Message,
  User
} from '@chatter-pwa/shared';

export enum ChatMachineState {
  Connected = 'CONNECTED',
  Disconnected = 'DISCONNECTED'
}
export enum ChatMachineEvent {
  Connect = 'CONNECT',
  Disconnect = 'DISCONNECT',
  SendMessage = 'SEND_MESSAGE',
  LoginUser = 'LOGIN_USER'
}

export const wsChatMachine = setup({
  types: {
    // actions: {} as ChatMachineActions, // TS Screaming with this but XState Docs suggests to implement like this
    context: {} as ChatMachineContext,
    events: {} as ChatMachineEvents,
  },
  actions: {
    updateLoggedInUser: assign({
      user: (_, params: { user: User }) => {
        if (params.user.userId) return params.user
        else return null;
      }
    }),
  }
}).createMachine({
  id: "chatMachine",
  entry: [{ type: 'updateLoggedInUser', params: { user: JSON.parse(sessionStorage.getItem('user') ?? '{}') as User } }],
  initial: ChatMachineState.Disconnected,
  context: {
    messages: [],
    user: null
  },
  states: {
    [ChatMachineState.Connected]: {
      on: {
        [ChatMachineEvent.Disconnect]: ChatMachineState.Disconnected,
        [ChatMachineEvent.SendMessage]: {
          actions: assign({
            messages: ({ event, context }: { event: any, context: ChatMachineContext }) => [ ...context.messages, event.payload as Message ]
          })
        },
        [ChatMachineEvent.LoginUser]: {
          actions: assign({
            user: ({ event, context }: { event: any, context: ChatMachineContext }) => event.payload as User
          })
        }
      }
    },
    [ChatMachineState.Disconnected]: {
      on: { [ChatMachineEvent.Connect]: ChatMachineState.Connected }
    }
  }
})

type ChatMachineSchema  = {
  states: {
    connected: {},
    disconnected: {}
  }
}
type ChatMachineContext = {
  messages: Message[],
  user: User | null
}
type ChatMachineEvents = { type: ChatMachineEvent } | { type: ChatMachineEvent.SendMessage, payload: Message } | { type: ChatMachineEvent.LoginUser, payload: User }
type ChatMachineActions = { type: ChatMachineActions, params: { user: User} }
type ActionTypes = 'updateLoggedInUser'

