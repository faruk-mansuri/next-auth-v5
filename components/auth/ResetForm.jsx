'use client';
import CardWrapper from './CardWrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ResetSchema } from '@/schemas';
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
import { resetPassword } from '@/actions/resetPassword';

const ResetForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const form = useForm({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      resetPassword(values).then((data) => {
        setError(data?.error);
        // TODO : Add when 2FA
        setSuccess(data?.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel='Forgot your password'
      backButtonLabel='Back to login'
      backButtonHref='/auth/login'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
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
          </div>

          <FormError message={error} />
          <FormSuccess message={success} />

          <Button disabled={isPending} className='w-full' type='submit'>
            Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ResetForm;
