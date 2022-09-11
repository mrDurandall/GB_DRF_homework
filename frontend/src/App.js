import './App.css';
import React from "react";
import UserList from "./components/User";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'authors': []
    }
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
