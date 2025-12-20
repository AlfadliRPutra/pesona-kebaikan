import React from 'react';
import { getAllNotifications } from '@/actions/notification';
import NotificationClient from './NotificationClient';

export default async function NotificationPage(props: { searchParams: Promise<{ page?: string }> }) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const { notifications, total, totalPages } = await getAllNotifications(page);
  
  return (
    <NotificationClient 
      initialNotifications={notifications} 
      totalPages={totalPages}
      currentPage={page}
    />
  );
}
