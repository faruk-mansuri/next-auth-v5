import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';

const UserInfo = ({ user, label }) => {
  return (
    <Card className='w-[500px] lg:w-[600px] shadow-md'>
      <CardHeader>
        <p className='text-2xl font-semibold text-center'>{label}</p>
      </CardHeader>

      <CardContent className='space-y-4'>
        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
          <p className='text-sm font-medium'>ID</p>
          <p className='p-1 truncate text-sm max-w-[250px] font-mono bg-slate-100 rounded-md'>
            {user.id}
          </p>
        </div>

        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
          <p className='text-sm font-medium'>Name</p>
          <p className='p-1 truncate text-sm max-w-[200px] font-mono bg-slate-100 rounded-md'>
            {user.name}
          </p>
        </div>

        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
          <p className='text-sm font-medium'>Email</p>
          <p className='p-1 truncate text-sm max-w-[200px] font-mono bg-slate-100 rounded-md'>
            {user.email}
          </p>
        </div>

        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
          <p className='text-sm font-medium'>Role</p>
          <p className='p-1 truncate text-sm max-w-[200px] font-mono bg-slate-100 rounded-md'>
            {user.role}
          </p>
        </div>

        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
          <p className='text-sm font-medium'>Two Factor Authentication</p>
          <Badge variant={user.isTwoFactorEnabled ? 'success' : 'destructive'}>
            {user.isTwoFactorEnabled ? 'ON' : 'OFF'}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfo;
