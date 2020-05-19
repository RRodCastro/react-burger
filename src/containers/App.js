import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons'

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

    return (
      <div className={classes.App}>    
          <h1>React App </h1>
          <button className={ classes.showButton } onClick={() => this.showPersonsHandler()}>
            Show persons ?
          </button>
          {this.state.showPersons ? (
          <Persons
            persons={this.state.persons} 
            deleteHandler={this.deletePersonHandler}
            changed={this.nameChangeHandler}
            charClickHandler={this.charClickHandlder}
          /> ): <div/>}
      </div>
    );
  }
}

export default App;
