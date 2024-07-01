import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full flex flex-col gap-2'>
            {label && <label
                className='block text-gray-300 '
                htmlFor={id}
            >
                {label}
            </label>
            }
            <input
                type={type}
                className={`w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500 ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
})

export default Input