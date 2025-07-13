import React from 'react'

const Button = ({children, type='button', bgColor="bg-blue-500", className='', ...props}) => {
  return (
    <button type={type} className={`text-white px-4 py-3 ${className} ${bgColor}`} {...props}>{children}</button>
  )
}

export default Button
