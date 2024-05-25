import { Flex, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Flex flexDirection="column" justifyContent="center" alignItems="center" flex={1}>
        <Text fontSize="6xl">Welcome to Chatter</Text>
        <Link as={NextLink} href="/chat" fontSize="3xl" textColor="plum">Chat</Link>
      </Flex>
    </main>
  );
}
