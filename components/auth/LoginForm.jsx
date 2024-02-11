'use client';

import CardWrapper from './CardWrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LoginSchema } from '@/schemas';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import FormError from '../FormError';
import FormSuccess from '../FormSuccess';
import { login } from '@/actions/login';
import { useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already use with different provider'
      : '';
  const callbackUrl = searchParams.get('callbackUrl');

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            // form.reset();
            setError(data.error);
          }
          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }
          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError('Something went wrong'));
    });
  };

  return (
    <CardWrapper
      headerLabel='Welcome back'
      backButtonLabel={`Don't have and account`}
      backButtonHref='/auth/register'
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            {!showTwoFactor && (
              <>
                {/* EMAIL */}
                <FormField
                  name='email'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            type='email'
                            placeholder='john.doe@example.com'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                {/* PASSWORD */}
                <FormField
                  name='password'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            type='password'
                            placeholder='******'
                            {...field}
                          />
                        </FormControl>
                        <Button
                          className='font-normal px-0'
                          variant='link'
                          size='sm'
                        >
                          <Link href='/auth/reset'>Forgot password</Link>
                        </Button>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </>
            )}

            {showTwoFactor && (
              // CODE
              <FormField
                name='code'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Two Factor Code</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          placeholder='123456'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            )}
          </div>

          <FormError message={error || urlError} />
          <FormSuccess message={success} />

          <Button disabled={isPending} className='w-full' type='submit'>
            {showTwoFactor ? 'Confirm' : 'Login'}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
