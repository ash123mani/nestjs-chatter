import React from 'react';
import { Box, Input, Textarea } from '@chakra-ui/react';

export const MessageForm = ({ sendMessage }: MessageFormProps) => {
  return (
    <Box className="h-1/6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(e);
          e.currentTarget.reset();
        }}
        className="flex w-full appearance-none flex-col outline-none"
      >
        <Textarea
          id="minput"
          placeholder="Message"
          className="mb-2 rounded-md border border-slate-400 bg-gray-800 text-white placeholder-slate-400 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
        ></Textarea>
        <Input
          type="submit"
          value="send"
          className="mb-2 rounded-md bg-violet-500 text-white placeholder-slate-400 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
        ></Input>
      </form>
    </Box>
  );
};

interface MessageFormProps {
  sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
}