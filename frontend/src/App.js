import './App.css';
import React from "react";
import axios from "axios";
import UserList from "./components/User";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'users': []
    }
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/users').then(response => {
      const users = response.data
      this.setState(
          {
            'users': users,
          }
      )
    }).catch(error => console.log(error))
    // const users = [
    //   {
    //     'first_name': 'Фёдор',
    //     'last_name': 'Достоевский',
    //     'birthday_year': 1821
    //   },
    //   {
    //     'first_name': 'Александр',
    //     'last_name': 'Грин',
    //     'birthday_year': 1880
    //   },
    // ]

  }

  render () {
    return (
        <div>
          <UserList users={this.state.users} />
        </div>
    )
  }
}

export default App;
