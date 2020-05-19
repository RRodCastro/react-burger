import React from 'react'

const validator = (props) => {

    return (
        <div>
            {props.name.length <= 5 ?
                <div style={{display: 'block'}}> Name too short!</div> :
                <div />
            }
            {props.children }
            
        </div>
    )
}

export default validator