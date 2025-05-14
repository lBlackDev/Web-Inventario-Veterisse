import React from 'react'
import LinkButton from '@/components/LinkButton'

interface ButtonNavigationProps {
  className?: string;
  children?: React.ReactNode;
  href: string;
}

export default function ButtonNavigation({className="", children, href}: ButtonNavigationProps) {

  const styleClass = `flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-gray-500 ${className}`

  return (
    <LinkButton href={href} className={styleClass} >
      {children}
    </LinkButton>
  )
}
