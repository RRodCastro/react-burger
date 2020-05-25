import React from 'react'
import classes from './BuildControl.css'

const buildControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>
                {props.label}
            </div>
            <button disabled={props.disabled} onClick={props.onRemove} className={classes.Less}> - </button>
            <button onClick={props.onAdd} className={classes.More}> + </button>       
        </div>
    )
}

export default buildControl