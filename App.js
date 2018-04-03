import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import uuid from 'uuid';
import $ from 'jquery';
//import Person from './Person/Person';
import Projects from "./Components/Projects";
import AddProjects from "./Components/AddProjects";
import Todos from './Components/Todos';

class App extends Component {
  /*
  state = {
    person: [
      {
        name: "Max",
        age : 28
      },
      {
        name: "Manu",
        age : 29
      },
      {
        name: "Stephanie",
        age : 26
      },
    ]
  }

  switchNameHandler = (newName) => {
    //console.log("Was clicked");
    //DON'T DO THIS this.state.person[0].name="Mary";
    this.setState({person: [
      {
        name: newName,
        age : 21
      },
      {
        name: "Ruth",
        age : 21
      },
      {
        name: "Esther",
        age : 16
      },
    ]});
  }

  nameChangedHandler = (event) => {
    this.setState({person: [
      {
        name: "Mary",
        age : 21
      },
      {
        name: event.target.value,
        age : 21
      },
      {
        name: "Esther",
        age : 16
      },
    ]});
  }

  render() {
    const style={
      backgroundColor: "white",
      font: "inherit",
      border: "1px solid blue",
      padding:"8px",
      cursor: "pointer"
    }

    return (
      <div className="App">
        <h1>Hi, I am a React app.</h1>
        <p>This is really working!</p>
        <button style={style} onClick={() => this.switchNameHandler("weeeee!!")}>Switch Name</button>
        <Person 
        name={this.state.person[0].name} 
        age={this.state.person[0].age} />
        <Person 
        name={this.state.person[1].name} 
        age={this.state.person[1].age}
        click={this.switchNameHandler.bind(this, "Lim")}
        changed={this.nameChangedHandler}>Hobbies: Watching movies</Person>
        <Person 
        name={this.state.person[2].name} 
        age={this.state.person[2].age} />
      </div>
    );

    //return React.createElement("div", {className:'App'}, React.createElement("h1", null, "Does this work now?"));
  }*/

  constructor(){
    super();
    this.state = {
      projects: [],
      todos: []
    };
  }

  getTodos(){
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/todos',
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({todos: data}, function(){
          console.log(this.state);
        });
      }.bind(this),
      error: function(xhr, status, err){
        console.log(err);
      }
    });
  }

  getProjects(){
    this.setState({projects: [
      {
        id: uuid.v4(),
        title: "Business Website",
        category: "Web design"
      },
      {
        id: uuid.v4(),
        title: "Social App",
        category: "Mobile development"
      },
      {
        id: uuid.v4(),
        title: "Ecommerce Shopping Cart",
        category: "Web development"
      }
    ]});
  }

  componentWillMount(){
    this.getProjects();
    this.getTodos();
  }

  componentDidMount(){
    this.getTodos();
  }

  handleAddProject(project){
    //console.log(project);
    let projects = this.state.projects;
    projects.push(project);
    this.setState({projects:projects});
  }

  handleDeleteProject(id){
    let projects = this.state.projects;
    let index = projects.findIndex(x => x.id === id);
    projects.splice(index, 1);
    this.setState({projects:projects});
  }

  render(){
    return (
      <div className="App">
        <AddProjects addProject={this.handleAddProject.bind(this)} />
        <Projects projects={this.state.projects} onDelete={this.handleDeleteProject.bind(this)} />
        <hr />
        <Todos todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
