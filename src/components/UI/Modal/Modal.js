import React from 'react'
import classes from './Modal.css'
import Wrapper from '../../../hoc/Hoc/Wrapper';
import Backdrop from '../Backdrop/Backdrop'

const modal = (props) => (
    <Wrapper>
        <Backdrop backdropHanlder={props.backdropHanlder} show={props.show} />
        <div
            className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>
    </Wrapper>
)

export default modal