import React, { Fragment, useEffect, useRef } from 'react';
import classes from './Person.css'
import wrapper from '../../Hoc/wrapper'
import PropTypes from 'prop-types'


const person = (props) => {

    const nameInputRef = useRef(null)

    useEffect( () =>  {
        nameInputRef.current.value = nameInputRef.current.value + ' &&'
    
        // Trigger just after first render
    }, []) ;

    return (
        <Fragment>
            <div onClick={props.deletePersonHandler} >My name is {props.name} and {props.age} years old. </div>
            <input
                ref={nameInputRef}
                stlye={{ display: 'block' }}
                onChange={props.changed}
                value={props.name}
            />
            {props.children}

        </Fragment>
    )

}

person.propTypes = {
    deletePersonHandler: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number
}

export default wrapper(person, classes.Person)