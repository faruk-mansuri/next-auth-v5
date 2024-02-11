'use client';

import { useSearchParams } from 'next/navigation';
import CardWrapper from './CardWrapper';
import { BeatLoader } from 'react-spinners';
import { useEffect, useState } from 'react';
import { newVerification } from '@/actions/newVerification';
import FormSuccess from '../FormSuccess';
import FormError from '../FormError';

const NewVerificationForm = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setError('Missing token');
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError('Something went wrong');
      });
  }, [token]);

  return (
    <CardWrapper
      headerLabel='Confirming your verification'
      backButtonLabel='Back to login'
      backButtonHref='/auth/login'
    >
      <div className='flex items-center w-full justify-center'>
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
