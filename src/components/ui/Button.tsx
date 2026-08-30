import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
}

export default function Button({ children, ...rest }: Props) {
  return (
    <button
      {...rest}
      className={`inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${rest.className ?? ''}`}
    >
      {children}
    </button>
  )
}
