'use client';

import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import LoginForm from './LoginForm';
import { useEffect, useState } from 'react';

const LoginButton = ({ children, mode }) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  const onClick = () => {
    router.push('/auth/login');
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  if (mode === 'modal') {
    return (
      <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className='p-0 w-auto bg-transparent border-none'>
          <LoginForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <span className='cursor-pointer ' onClick={onClick}>
      {children}
    </span>
  );
};

export default LoginButton;
