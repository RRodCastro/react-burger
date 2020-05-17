import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'
import Validator from './Validator/Validator'

const style = {
  display: 'inline-block',
  padding: '16px',
  margin: '16px',
  textAlign: 'center',
  border: '1px solid black'
}

class App extends Component {

  state = {
    persons: [
      {id: 1, name: "Name1", age: 20},
      {id: 2, name: "Name 2", age: 25}
    ],
    showPersons: false
  }

  deletePersonHandler = (index) => {
    const persons = [...this.state.persons]
    // inplace 
    persons.splice(index, 1)
    this.setState({persons})
  }

  nameChangeHandler = (event, id) => {
    const persons = [...this.state.persons]
    const personIndex = this.state.persons.findIndex((p) => p.id === id)

    const person = persons[personIndex]
    person.name = event.target.value

    persons[personIndex] = person

    this.setState({persons})

    
    
  }

  showPersonsHandler = () => {
    const showPersons = !this.state.showPersons
    this.setState({showPersons})
  }

  

  charClickHandlder = (index, id) => {
    const persons = [...this.state.persons]
    const personIndex = this.state.persons.findIndex( (ele) => ele.id === id )
    const person = persons[personIndex]
    const name = person.name.split('')
    name.splice(index, 1)
    person.name = name.join("")

    persons[personIndex] = person

    this.setState({persons})
  }

  render() {

    const persons = this.state.persons.map((person, index ) => (
      <Person
        key={index}
        name={person.name}
        age={person.age}
        deletePersonHandler={() => this.deletePersonHandler(index)}
        changed={ (event)  => this.nameChangeHandler(event, person.id)}
      >
      <Validator
        name={person.name}
      >
        {person.name.split('').map( (ele, charIndex ) => (
                <div onClick={ () => this.charClickHandlder(charIndex, person.id) } style={style} key={charIndex}>
                    {ele}
                </div>
            ) )}
      </Validator>
        
      </Person>
    ))


    return (
      <div className="App">    
          <h1>React App </h1>
          <button onClick={() => this.showPersonsHandler()} style={{cursor: 'pointer', backgroundColor: '#000080', color: 'white'}}>
            Show persons ?
          </button>
          {this.state.showPersons ?  persons : <div/>}
      </div>
    );
  }
}

export default App;
