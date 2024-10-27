/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, ReactNode } from 'react';
import { useToast, UseToastOptions } from '@chakra-ui/react';

const ToastContext = createContext<any>(null);

export const toastOptions: UseToastOptions = {
  isClosable: true,
  position: 'top',
  duration: 3000,
  variant: 'solid',
};

export const showToast = (
  toast: any,
  message: string,
  status: string,
  title?: string
) => {
  if (typeof toast === 'function') {
    toast({
      description: message || 'Failed',
      status,
      ...(title ? { title } : {}),
      ...toastOptions,
    });
  } else {
    console.error('Toast is not a function');
  }
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const toast = useToast();
  return (
    <ToastContext.Provider value={toast}>{children}</ToastContext.Provider>
  );
};

export const useToastContext = () => useContext(ToastContext);
