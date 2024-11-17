'use client';

import Link from 'next/link';
import Image from '@/components/ui/Image';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Image
        src="/images/logo.png"
        alt="Kusina De Amadeo"
        width={48}
        height={48}
        priority={true}
        className="w-12 h-12"
      />
      <span className="text-xl font-bold">Kusina De Amadeo</span>
    </Link>
  );
}
