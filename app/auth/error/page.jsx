import CardWrapper from '@/components/auth/CardWrapper';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

const ErrorPage = () => {
  return (
    <CardWrapper
      backButtonLabel='Back to login'
      backButtonHref='/auth/login'
      headerLabel='Oops! something went wrong'
    >
      <div className='w-full flex items-center justify-center'>
        <ExclamationTriangleIcon className='text-destructive' />
      </div>
    </CardWrapper>
  );
};

export default ErrorPage;
