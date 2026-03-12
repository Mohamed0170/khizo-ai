import React from 'react'

const Header = ({ title, subtitle }: { title: string, subtitle?: string }) => {
  return (
    <div className="animate-fadeInUp">
      <h2 className="h2-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900 dark:from-white dark:via-indigo-200 dark:to-white bg-clip-text text-transparent">{title}</h2>
      {subtitle && <p className="p-16-regular mt-4 text-gray-500 dark:text-slate-400">{subtitle}</p>}
    </div>
  )
}

export default Header