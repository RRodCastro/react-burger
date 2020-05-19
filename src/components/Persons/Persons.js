import React from 'react'
import Person from './Person/Person'
import Validator from '../Validator/Validator'

import classes from '../../containers/App.css';

const persons = (props) => (

    props.persons.map((person, index ) => (
        <Person
          key={index}
          name={person.name}
          age={person.age}
          deletePersonHandler={() => props.deleteHandler(index)}
          changed={ (event)  => props.changed(event, person.id)}
        >
        <Validator
          name={person.name}
        >
          {person.name.split('').map( (ele, charIndex ) => (
                  <div className={classes.charElement }onClick={ () => props.charClickHandler(charIndex, person.id) } key={` ${index}  ${charIndex}`}>
                      {ele}
                  </div>
              ) )}
        </Validator>
        </Person>
      ))

)

export default persons