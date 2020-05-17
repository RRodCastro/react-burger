import React from 'react';
import Radium from 'radium'
import './Person.css'
const person = (props) => {
    const style = {
        '@media (min-width: 500px)': {
            width: '450px'
        }
    };

    return (
        <div className="Person" style={style}>
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

export default Radium(person)