import React from 'react'

const Loader = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
        <div className='size-12 border-3 h-10 w-10 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
    </div>
  )
}

export default Loader