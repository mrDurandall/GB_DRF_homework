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
import Cookies from "universal-cookie/es6";
import {Link} from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'users': [],
      'projects': [],
      'todos': [],
      'token':''
    }
  }

  set_token(token) {
      const cookies = new Cookies()
      cookies.set('token', token)
      this.setState({'token': token})
  }

  is_authenticated() {
      return this.state.token != ''
  }

  logout() {
      this.set_token('')
  }

  get_token_from_storage() {
      const cookies = new Cookies()
      const token = cookies.get
      this.setState({'token': token})
  }

  get_token(username, password) {
    axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password}).then(
        response => {
            this.set_token(response.data['token'])
        }
    ).catch(error => alert('Неверный логин или пароль'))
  }

  componentDidMount() {

    this.get_token_from_storage()

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
    return (
        <div>
            <BrowserRouter>
                <div className="container">
                    <HeaderItem />
                    {this.is_authenticated() ?
                        <button onClick={() => this.logout()}>Logout</button> :
                        <Link to={'/login'}>Login</Link>}

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
                        <Route exact path='login'
                               element={ <LoginForm
                                   get_token={(username, password) => this.get_token(username, password)}
                               /> } />
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
