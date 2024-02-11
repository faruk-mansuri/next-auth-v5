'use client';

import { useCurrentUserRole } from '@/hooks/useCurrentRole';
import FormError from '../FormError';

const RoleGate = ({ children, allowedRole }) => {
  const role = useCurrentUserRole();

  if (role !== allowedRole) {
    return (
      <FormError message='You do not have permission to view this component' />
    );
  }

  return <>{children}</>;
};

export default RoleGate;
