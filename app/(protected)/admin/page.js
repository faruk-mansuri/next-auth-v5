'use client';

import { admin } from '@/actions/admin';
import FormSuccess from '@/components/FormSuccess';
import RoleGate from '@/components/auth/RoleGate';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { toast } from 'sonner';

const AdminPage = () => {
  const onApiRouteClick = async () => {
    fetch('/api/admin').then((response) => {
      if (response.ok) {
        toast.success('Allowed api route');
      } else {
        toast.error('Forbidden api route');
      }
    });
  };

  const onServerActionClick = async () => {
    admin().then((data) => {
      if (data.error) {
        toast.error(data.error);
      }

      if (data.success) {
        toast.success(data.success);
      }
    });
  };

  return (
    <Card className='w-[420px] md:w-[600px]'>
      <CardHeader>
        <p className='text-2xl font-semibold text-center'>🔑 Admin</p>
      </CardHeader>

      <CardContent className='space-y-4'>
        <RoleGate allowedRole='ADMIN'>
          <FormSuccess message='You are allowed to see this content' />
        </RoleGate>
        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md'>
          <p className='text-sm font-medium'>Admin-only API Route</p>
          <Button onClick={onApiRouteClick}>Click to test</Button>
        </div>

        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md'>
          <p className='text-sm font-medium'>Admin-only Server Action</p>
          <Button onClick={onServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
