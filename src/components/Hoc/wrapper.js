import React from 'react'


const wrapperWithClass = (WrapperComponent, className) => {
    return props => (
        <div className={className}>
            <WrapperComponent {...props} />
        </div>
    )
}

export default wrapperWithClass