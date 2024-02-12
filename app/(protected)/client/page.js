'use client';
import UserInfo from '@/components/UserInfo';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useEffect, useState } from 'react';

const ClientPage = () => {
  const user = useCurrentUser();
  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user]);

  return <UserInfo user={currentUser} label='📱 Client Component' />;
};

export default ClientPage;
