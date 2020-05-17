import React from 'react';
import classes from  './Person.css'
const person = (props) => {

    return (
        <div className={classes.Person}>
            My name is
            <h2 onClick={props.deletePersonHandler }> {props.name}</h2>
            <h2> {props.age} </h2>
            <input
                onChange={props.changed}
                value={props.name}
            />
            {props.children}

        </div>
    )

}

export default person