import { Suspense } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';

import { ToastProvider } from 'context/toast';
import { router } from 'routes/router';
import ProgressBar from 'components/ProgressBar';

const App = () => (
  <ChakraProvider>
    <ToastProvider>
      <Suspense fallback={<ProgressBar />}>
        <RouterProvider router={router} />
      </Suspense>
    </ToastProvider>
  </ChakraProvider>
);

export default App;
