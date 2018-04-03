import React, { Component } from 'react';
import './App.css';
import uuid from 'uuid';
import $ from 'jquery';
import Projects from "./Components/Projects";
import AddProjects from "./Components/AddProjects";
import Todos from './Components/Todos';

class App extends Component {
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
