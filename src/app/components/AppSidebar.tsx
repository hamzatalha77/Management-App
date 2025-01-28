import { useClerk, useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from './ui/sidebar'
import { BookOpen, Briefcase, PanelLeft, Settings, User } from 'lucide-react'
import Loading from './Loading'
import Image from 'next/image'
import { cn } from '../lib/utils'
import Link from 'next/link'

const AppSidebar = () => {
  const { user, isLoaded } = useUser()
  const { signOut } = useClerk()
  const pathname = usePathname()
  const { toggleSidebar } = useSidebar()

  const navLinks = {
    student: [
      { icon: BookOpen, label: 'Courses', href: '/user/courses' },
      { icon: Briefcase, label: 'Billing', href: '/user/billing' },
      { icon: User, label: 'Profile', href: '/user/profile' },
      { icon: Settings, label: 'Settings', href: '/user/settings' }
    ],
    teacher: [
      { icon: BookOpen, label: 'Courses', href: '/teacher/courses' },
      { icon: Briefcase, label: 'Billing', href: '/teacher/billing' },
      { icon: User, label: 'Profile', href: '/teacher/profile' },
      { icon: Settings, label: 'Settings', href: '/teacher/settings' }
    ]
  }
  if (!isLoaded) return <Loading />
  if (!user) return <div>User not found</div>

  const userType =
    (user.publicMetadata.userType as 'student' | 'teacher') || 'student'
  const currentNavLinks = navLinks[userType]
  return (
    <Sidebar
      collapsible="icon"
      style={{ height: '100vh' }}
      className="bg-customgreys-primarybg border-none shadow-lg"
    >
      <SidebarHeader>
        <SidebarMenu className="app-sidebar__menu">
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              onClick={() => toggleSidebar()}
              className="group hover:bg-customgreys-secondarybg"
            >
              <div className="app-sidebar__logo-container group">
                <div className="app-sidebar__logo-wrapper">
                  <Image
                    src="/logo.svg"
                    alt="logo"
                    width={25}
                    height={20}
                    className="app-sidebar__logo"
                  />
                  <p className="app-sidebar__title">GOTEI 13</p>
                </div>
                <PanelLeft className="app-sidebar__collapse-icon" />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="app-sidebar__nav-menu">
          {currentNavLinks.map((link) => {
            const isActive = pathname.startsWith(link.href)
            return (
              <SidebarMenuItem
                key={link.href}
                className={cn(
                  'app-sidebar__nav-item',
                  isActive && 'bg-gray-800'
                )}
              >
                <SidebarMenuButton
                  asChild
                  size="lg"
                  className={cn(
                    'app-sidebar__nav-button',
                    !isActive && 'text-customgreys-dirtyGrey'
                  )}
                >
                  <Link href={link.href} className="app-sidebar__nav-link">
                    <link.icon
                      className={isActive ? 'text-white-50' : 'text-gray-500'}
                    >
                      <span
                        className={cn(
                          'app-sidebar__nav-text',
                          isActive ? 'text-white-50' : 'text-gray-500'
                        )}
                      >
                        {link.label}
                      </span>
                    </link.icon>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar
