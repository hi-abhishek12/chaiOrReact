import React from 'react'

function Button({
    children,
    type = 'text',
    className = '',
    bgColor = 'bg-blue-600',
    textColor = 'white',
    ...props
}) {
  return (
    <button className={`px-4 py-2 rounded-lg 
        ${className} ${bgColor} ${type}`}
        {...props}
        >{children}
    </button>
  )
}

export default Button