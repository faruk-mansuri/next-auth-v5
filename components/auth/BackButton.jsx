'use client';

import Link from 'next/link';
import { Button } from '../ui/button';

const BackButton = ({ label, href }) => {
  return (
    <Button variant='link' className='font-normal w-full' size='sm'>
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default BackButton;
