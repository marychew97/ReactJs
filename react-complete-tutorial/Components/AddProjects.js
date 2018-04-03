import React, { Component } from 'react';
import ProjectItem from "./ProjectItem";
import uuid from 'uuid';

class AddProjects extends Component {
    constructor(){
        super();
        this.state={
            newProjects: []
        };
    }

    static defaultProps = {
        categories: ["Web Design", "Web Development", "Mobile Development"]
    }

    handleSubmit(e){
        if(this.refs.title.value === ""){
            alert("Title is required");
        }else{
            this.setState({newProjects:{
                id: uuid.v4(),
                title: this.refs.title.value,
                category: this.refs.category.value
            }}, function(){
                //console.log(this.state);
                this.props.addProject(this.state.newProjects);
            });
        }
        e.preventDefault();
    }

    //ref attribute is to get the value easily
  render(){
    let categoryOptions = this.props.categories.map(category => {
        return <option key={category} value={category} >{category}</option>
    });
    return (
      <div>
        <h3>Add Projects</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
            <div>
                <label>Title</label><br />
                <input type="text" ref="title" />
            </div><br />
            <div>
                <label>Category</label><br/>
                <select ref="category">
                    {categoryOptions}
                </select>
            </div>
            <br />
            <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

/*
AddProject.propTypes = {
    categories: React.PropTypes.array,
    addProject: React.PropTypes.func  
}*/

export default AddProjects;
