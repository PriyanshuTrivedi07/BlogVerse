import React, { useId } from 'react'

function Select({
    options,
    label,
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full flex flex-col gap-2'>
            {label && <label
                htmlFor={id}
                className='block text-gray-300'
            >
                {label}
            </label>
            }
            <select
                name=""
                {...props}
                id={id}
                ref={ref}
                className={`w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500 ${className}`}
            >
                {options?.map((option) => (
                    <option key={option}
                        value={option}
                    >
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)