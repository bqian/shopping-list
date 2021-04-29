import React from 'react'

const containerStyle = {
    width: 900,
    margin: '0 auto',
    padding: '20px 0px'
}

export default function Container({ children }) {
    return (
        <div sylte={containerStyle}>
            {children}
        </div>
    )
}