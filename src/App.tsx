import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ToastProvider } from 'context/toast';
import { router } from 'routes/router';
import ProgressBar from 'components/ProgressBar';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: false,
      suspense: false,
      cacheTime: 0,
    },
    mutations: {
      cacheTime: 0,
      retry: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ChakraProvider>
      <ToastProvider>
        <Suspense fallback={<ProgressBar />}>
          <RouterProvider router={router} />
        </Suspense>
      </ToastProvider>
    </ChakraProvider>
  </QueryClientProvider>
);

export default App;
