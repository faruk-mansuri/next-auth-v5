'use client';

import { logout } from '@/actions/logout';

const LogoutButton = ({ children }) => {
  const onClick = () => {
    logout();
  };

  return (
    <span onClick={onClick} className='cursor-pointer'>
      {children}
    </span>
  );
};

export default LogoutButton;
