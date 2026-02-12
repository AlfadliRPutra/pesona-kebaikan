import React from 'react';
import UsersClient from './UsersClient';
import { getUsers, getUserStats } from '@/actions/user';

export const dynamic = 'force-dynamic';

export default async function UsersPage() {
  const [userData, stats] = await Promise.all([
    getUsers(),
    getUserStats()
  ]);

  return (
    <UsersClient 
      initialUsers={userData.users} 
      initialTotal={userData.total} 
      stats={stats} 
    />
  );
}
