import { ChakraProvider } from '@chakra-ui/react';
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

export default function App() {
  return (
    <ChakraProvider resetCSS>
      <QueryClientProvider client={queryClient}>
        <Timer />
        <Prices />
      </QueryClientProvider>
    </ChakraProvider>
  );
}
