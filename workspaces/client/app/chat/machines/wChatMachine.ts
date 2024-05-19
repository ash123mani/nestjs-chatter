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
  SendMessage = 'SEND_MESSAGE'
}

// @ts-ignore
export const wsChatMachine = setup({
  types: {
      context: {} as ChatMachineContext,
    events: {} as ChatMachineEvents
  },
  actions: {
    updateLoggedInUser: assign({
      user: ({ context }) => {
        const currentUser = JSON.parse(sessionStorage.getItem('user') ?? '{}') as User;
        if (currentUser.userId) return currentUser
        else return null;
      }
    }),
  }
}).createMachine({
  id: "chatMachine",
  entry: [{ type: 'updateLoggedInUser' }],
  initial: "disconnected",
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
            // messages: ({ event, context }: { event: any, context: ChatMachineContext }) => context.messages.push((event.message as Message))
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
type ChatMachineEvents = { type: ChatMachineEvent } | { type: ChatMachineEvent.SendMessage, message: Message }

