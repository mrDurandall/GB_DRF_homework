import './App.css';
import React from "react";
import axios from "axios";
import {BrowserRouter, Route, Routes, Navigate, useNavigate} from "react-router-dom";
import UserList from "./components/User";
import HeaderItem from "./components/Header";
import Footer from "./components/Footer";
import ProjectList from "./components/Project";
import ToDoList from "./components/ToDo";
import ProjectDetailed from "./components/ProjectDetailed";
import LoginForm from "./components/Authentication";
import Cookies from "universal-cookie/es6";
import {Link} from "react-router-dom";
import ProjectForm from "./components/ProjectForm";
import ToDoForm from "./components/ToDoForm";
import ProjectSearchForm from "./components/ProjectSearchForm";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'users': [],
      'projects': [],
      'todos': [],
      'token': '',
      'current_user': ''
    }
  }

  set_token(token, username) {
      const cookies = new Cookies()
      cookies.set('token', token)
      cookies.set('current_user', username)
      this.setState({'token': token}, ()=>this.load_data())
  }

  is_authenticated() {
      return this.state.token != ''
  }

  logout() {
      this.set_token('')
      this.setState({'current_user': ''})
  }

  get_token_from_storage() {
      const cookies = new Cookies()
      const token = cookies.get('token')
      const current_user = cookies.get('current_user')
      this.setState({'token': token, 'current_user': current_user}, ()=>this.load_data())
  }

  get_token(username, password) {
    axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password}).then(
        response => {
            this.set_token(response.data['token'], username)
            this.setState({'current_user': username})
        }
    ).catch(error => alert('Неверный логин или пароль'))
  }

  get_headers() {
      let headers = {
          'Content-Type': 'application/json'
      }

      if (this.is_authenticated())
          {
              headers['Authorization'] = 'Token ' + this.state.token
          }

      return headers
  }

  load_data() {
      const headers = this.get_headers()
          axios.get('http://127.0.0.1:8000/api/users', {headers}).then(response => {
      const users = response.data.results
      this.setState(
          {
            'users': users,
          }
      )
    }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/projects', {headers}).then(response => {
      const projects = response.data.results
      this.setState(
          {
            'projects': projects,
          }
      )
    }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/todos', {headers}).then(response => {
      const todos = response.data.results
      this.setState(
          {
            'todos': todos,
          }
      )
    }).catch(error => console.log(error))
  }

  componentDidMount() {

    this.get_token_from_storage()

  }

  deleteProject (id) {
      const headers = this.get_headers()
      axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers}).then(
          response => {this.setState({projects: this.state.projects.filter((item) => item.id !== id)})}
      ).catch(error => console.log(error))
  }

  createProject (title, repo_link, users) {
      const headers = this.get_headers()
      const data = {
          title: title,
          repo_link: repo_link,
          users: users
      }
      axios.post(
          `http://127.0.0.1:8000/api/projects/`,
          data,
          {headers}
      ).then(response => {
          let new_project = response.data
          this.setState({projects: [...this.state.projects, new_project]})
      }).catch(error => console.log(error))
  }

  searchProject (part_title) {
      this.setState({projects: this.state.projects.filter((item) => item.title.indexOf(part_title) !== -1)})

  }

  deleteToDo (id) {
      const headers = this.get_headers()
      axios.delete(`http://127.0.0.1:8000/api/todos/${id}`, {headers}).then(
          response => {}
      ).catch(error => console.log(error))
  }

  createToDo (text, project) {
      const headers = this.get_headers()
      const data = {
          text: text,
          project: project,
          is_active: true
      }
      console.log(data)
      axios.post(
          `http://127.0.0.1:8000/api/todos/`,
          data,
          {headers}
      ).then(response => {
          let new_todo = response.data
          this.setState({todos: [...this.state.todos, new_todo]})
      }).catch(error => console.log(error))
  }

  render () {
    return (
        <div>
            <BrowserRouter>
                <div className="container">
                    <HeaderItem />
                    {this.is_authenticated() ?
                        <button onClick={() => this.logout()}>Logout ({this.state.current_user})</button> :
                        <Link to={'/login'}>Login</Link>}

                    <Routes>
                        <Route exact path='users' element={ <UserList users={this.state.users} /> } />

                        <Route path='projects'>
                            <Route index element={ <ProjectList
                                projects={this.state.projects}
                                deleteProject={(id)=>this.deleteProject(id)}

                            /> } />
                            <Route path='search' element={ <ProjectSearchForm
                                projects={this.state.projects}
                                searchProject = {(part_title) => this.searchProject(part_title)}
                            /> } />
                            <Route path='create' element={<ProjectForm
                                users={this.state.users}
                                createProject={(title, repo_link, users) => this.createProject(title, repo_link, users)}
                            /> } />
                            <Route path=':projectId' element={<ProjectDetailed
                                projects={this.state.projects}
                                todos={this.state.todos}
                                deleteProject={(id)=>this.deleteProject(id)}
                            /> } />
                        </Route>

                        <Route path='todos'>
                            <Route index element={ <ToDoList
                                todos={this.state.todos}
                                deleteToDo={(id)=>this.deleteToDo(id)}
                            /> } />
                            <Route path='create' element={<ToDoForm
                                projects={this.state.projects}
                                createToDo={(text, project) => this.createToDo(text, project)}
                            />}/>
                        </Route>

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
