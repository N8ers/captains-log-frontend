import React from "react";

import Header from "./components/Header";
import Logs from "./components/Logs";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newLogClicked: false
    };
    this.handleNewLogToggle = this.handleNewLogToggle.bind(this);
  }

  handleNewLogToggle() {
    this.setState({
      newLogClicked: !this.state.newLogClicked
    });
  }

  render() {
    return (
      <div>
        <Header
          newLogClicked={this.handleNewLogToggle}
          btnState={this.state}
        ></Header>
        <Logs btnState={this.state}></Logs>
      </div>
    );
  }
}

export default App;
