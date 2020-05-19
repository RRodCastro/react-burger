import React from 'react';
import classes from  './Person.css'

const person = (props) => {

    return (
        <div className={classes.Person}>
            <div>My name is {props.name} and {props.age} years old. </div>
            <input
                stlye={{display: 'block'}}
                onChange={props.changed}
                value={props.name}
            />
            {props.children}

        </div>
    )

}

export default person