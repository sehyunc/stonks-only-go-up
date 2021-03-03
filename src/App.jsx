import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import React from 'react';
import Timer from './Timer';
import Prices from './Prices';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import axios from 'axios';

const queryClient = new QueryClient();
axios.defaults.baseURL = 'https://financialmodelingprep.com/api/v3/';

const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};

const customTheme = extendTheme({ config });

export default function App() {
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      <QueryClientProvider client={queryClient}>
        <Timer />
        <Prices />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ChakraProvider>
  );
}
