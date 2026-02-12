import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import AdminUserDetailClient from './AdminUserDetailClient';

export default async function AdminUserDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      createdAt: true,
      image: true,
      emailVerified: true
    }
  });

  if (!user) {
    notFound();
  }

  return <AdminUserDetailClient user={user} />;
}