'use client'
import Navbar from '@/components/Navbar'
import { useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Loading from '../components/Loading'
import { cn } from '../lib/utils'
import { SidebarProvider } from '../components/ui/sidebar'
import AppSidebar from '../components/AppSidebar'

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [courseId, setCourseId] = useState<string | null>(null)
  const { user, isLoaded } = useUser()

  if (!isLoaded) return <Loading />
  if (!user) return <div>Please sign in to access this page.</div>
  return (
    <SidebarProvider>
      <div className="dashboard">
        <AppSidebar />
        <div className="dashboard__content">
          <div className={cn('dashboard__main')} style={{ height: '100vh' }}>
            <main className="dashboard-body">{children}</main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
