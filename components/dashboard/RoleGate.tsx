'use client';

import { useAuth, useUser } from '@clerk/nextjs';
import React from 'react';
import { useRouter } from 'next/navigation';

type RoleGateProps = {
  children: React.ReactNode;
  className?: string;
};

export default function RoleGate({ children, className }: RoleGateProps) {
  const { sessionClaims } = useAuth();
  const router = useRouter();

  if (sessionClaims?.metadata.role !== 'admin') {
    return null;
  }
  return (
    <button
      type="button"
      onClick={() => router.push('/admin')}
      className={`flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-medium rounded-lg hover:from-orange-600 hover:to-yellow-600 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 ${className}`}
    >
      {children}
    </button>
  );
}
