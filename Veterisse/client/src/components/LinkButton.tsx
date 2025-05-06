import React from 'react'

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function LinkButton({href, children, className="", onClick}:LinkButtonProps) {

  const styleClass = `${className}`

  return (
    <a className={styleClass} href={href} onClick={onClick}>{children}</a>
  )
}
