'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

const LoginButton = () => {
  const router = useRouter();

  const onClick = () => {
    router.push('/auth/login');
  };

  return (
    <Button
      variant='secondary'
      size='lg'
      className='cursor-pointer '
      onClick={onClick}
    >
      Sign in
    </Button>
  );
};

export default LoginButton;
