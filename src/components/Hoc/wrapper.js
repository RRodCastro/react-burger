import React from 'react'


const wrapperWithClass = (WrapperComponent, className) => {
    return props => (
        <div className={className}>
            <WrapperComponent />
        </div>
    )
}

export default wrapperWithClass