import Link from 'next/link'
import React from 'react'

const NonDashboardNavbar = () => {
  return (
    <nav className="nondashboard-navbar">
      <div className="nondashbaord-navbar__container">
        <Link href="/" className="nondashbaord-navbar__brand">
          GOTEI
        </Link>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Link href="/search" className="nondashbaord-navbar__search-input">
              <span className="hidden sm:inline">Search Courses</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NonDashboardNavbar
