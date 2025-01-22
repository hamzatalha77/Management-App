import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="auth-layout">
      <main className="auth-layout__main">{children}</main>
    </div>
  )
}

export default layout
