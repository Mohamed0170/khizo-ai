import React from 'react'

const Header = ({ title, subtitle }: { title: string, subtitle?: string }) => {
  return (
    <>
      <h2 className="h2-bold text-dark-600 dark:text-white">{title}</h2>
      {subtitle && <p className="p-16-regular mt-4 dark:text-slate-400">{subtitle}</p>}
    </>
  )
}

export default Header