import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props
}) {
    return (
        <button
            type={type}
            className={`py-2 px-4 rounded-lg focus:outline-none ${className} ${bgColor} ${textColor}`}
            
            {...props}
        >
            {children}
        </button>
    )
}

export default Button