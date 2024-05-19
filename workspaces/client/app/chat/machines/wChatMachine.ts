import { createMachine, assign } from "xstate";

export const wsChatMachine = createMachine({
  id: "chatMachine",
  initial: "disconnected",
  context: {
    messages: [],
    user: null
  },
  states: {
    connected: {
      on: { DISCONNECT: 'disconnected' }
    },
    disconnected: {
      on: { CONNECT: 'connected' }
    }
  }
})