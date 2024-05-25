import { Box } from '@chakra-ui/react';

function Loading() {
  return (
    <Box className="flex w-full items-center justify-center py-2">
      <Box className="flex w-full items-center justify-center">
        <Box
          className="flex h-10 w-10 animate-spin items-center justify-center rounded-full bg-gradient-to-tr from-slate-500 to-slate-800">
          <Box className="h-6 w-6 rounded-full bg-gray-800"></Box>
        </Box>
      </Box>
    </Box>
  );
}