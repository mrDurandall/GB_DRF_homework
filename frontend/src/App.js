import './App.css';
import React from "react";
import axios from "axios";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import UserList from "./components/User";
import HeaderItem from "./components/Header";
import Footer from "./components/Footer";
import ProjectList from "./components/Project";
import ToDoList from "./components/ToDo";
import ProjectDetailed from "./components/ProjectDetailed";
import LoginForm from "./components/Authentication";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'users': [],
      'projects': [],
      'todos': []
    }
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/users').then(response => {
      const users = response.data.results
      this.setState(
          {
            'users': users,
          }
      )
    }).catch(error => console.log(error))
    axios.get('http://127.0.0.1:8000/api/projects').then(response => {
      const projects = response.data.results
      this.setState(
          {
            'projects': projects,
          }
      )
    }).catch(error => console.log(error))
    axios.get('http://127.0.0.1:8000/api/todos').then(response => {
      const todos = response.data.results
      this.setState(
          {
            'todos': todos,
          }
      )
    }).catch(error => console.log(error))
  }

  render () {
    console.log(this.state.projects)
    console.log(this.state.todos)
    return (
        <div>
            <BrowserRouter>
                <div className="container">
                    <HeaderItem />
                    <Routes>
                        <Route exact path='users' element={ <UserList users={this.state.users} /> } />
                        <Route path='projects'>
                            <Route index element={ <ProjectList projects={this.state.projects} /> } />
                            <Route path=':projectId' element={<ProjectDetailed
                                projects={this.state.projects}
                                todos={this.state.todos}
                            /> } />
                        </Route>
                        <Route exact path='todos' element={ <ToDoList todos={this.state.todos} /> } />
                        <Route exact path='login' element={ <LoginForm /> } />
                        <Route exact path='/' element={ <Navigate to='/projects' /> } />
                    </Routes>
                </div>
            </BrowserRouter>
            <Footer />
        </div>
    )
  }
}

export default App;
