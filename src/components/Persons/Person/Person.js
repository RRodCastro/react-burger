import React, { Fragment } from 'react';
import classes from './Person.css'
import wrapper from '../../Hoc/wrapper'

const person = (props) => {

    return (
        <Fragment>
            <div onClick={props.deletePersonHandler} >My name is {props.name} and {props.age} years old. </div>
            <input
                stlye={{ display: 'block' }}
                onChange={props.changed}
                value={props.name}
            />
            {props.children}

        </Fragment>
    )

}

export default wrapper(person, classes.Person)