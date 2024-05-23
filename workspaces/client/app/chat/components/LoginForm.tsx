import React from 'react';
import { Box, Button, Input } from '@chakra-ui/react';

export function LoginForm({ login }: LoginFormProps) {
  return (
    <Box className="my-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login(e);
        }}
        className="flex h-127 w-127 items-center justify-center"
      >
        <Input
          type="text"
          id="login"
          placeholder="Name"
          className="rounded text-white"
        ></Input>
        <Button
          type="submit"
          className="mx-2 flex h-12 w-12 items-center justify-center  text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </Button>
      </form>
    </Box>
  );
};

interface LoginFormProps {
  login: (e: React.FormEvent<HTMLFormElement>) => void;
}