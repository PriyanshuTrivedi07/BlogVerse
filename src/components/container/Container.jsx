import React from 'react'

function Container({ children }) {
    return (
        <div className='w-full max-w-7xl mx-auto min-h-[85vh]'>
            {children}
        </div>
    )
}

export default Container