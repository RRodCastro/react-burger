import React from 'react';

const person = (props) => {
    return (
        <div>
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