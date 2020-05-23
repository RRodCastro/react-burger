import React, { Fragment } from 'react'
import wrapper from '../Hoc/wrapper';

const validator = (props) => {

    return (
        <Fragment>
            {props.name.length <= 5 ?
                <div style={{display: 'block'}}> Name too short!</div> :
                <div />
            }
            {props.children }
            
        </Fragment>
    )
}

export default wrapper(validator);