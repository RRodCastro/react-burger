import React, { Fragment } from 'react'
import wrapper from '../Hoc/wrapper';
import PropTypes from 'prop-types'

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

validator.propTypes = {
    name: PropTypes.string
}

export default wrapper(validator);