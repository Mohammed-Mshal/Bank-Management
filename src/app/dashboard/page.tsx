import React from 'react'
import { verifySession } from '../libs/session';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await verifySession();
  if (!session?.userId) {
    redirect("/auth/login");
  }
  return (
    <div>Dashboard</div>
  )
}
