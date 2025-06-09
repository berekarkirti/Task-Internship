import React from 'react'

const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-spin w-10 h-10 border-4 border-t-gray-400 border-gray-900 rounded-full">Loading</div>
        </div>
    )
}

export default Loading;
