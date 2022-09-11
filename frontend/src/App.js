import './App.css';
import React from "react";

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
          Main App
        </div>
    )
  }
}

export default App;
