import Link from 'next/link';
import { LuTent } from 'react-icons/lu';
import { Button } from '../ui/button';

import React from 'react';

function Logo() {
  return (
    // since asChild is used, in  browser The child element will be shown instead of the parent
    <Button size='icon' asChild>
      <Link href='/'>
        <LuTent className='w-6 h-6 '></LuTent>
      </Link>
    </Button>
  );
}

export default Logo;
