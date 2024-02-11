'use client';
import CardWrapper from './CardWrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { NewPasswordSchema } from '@/schemas';
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
import { useState, useTransition } from 'react';
import { newPassword } from '@/actions/newPassword';
import { useSearchParams } from 'next/navigation';

const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const form = useForm({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = async (values) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        // TODO : Add when 2FA
        setSuccess(data?.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel='Enter a new password'
      backButtonLabel='Back to login'
      backButtonHref='/auth/login'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            {/* EMAIL */}
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
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          <FormError message={error} />
          <FormSuccess message={success} />

          <Button disabled={isPending} className='w-full' type='submit'>
            Reset password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default NewPasswordForm;
