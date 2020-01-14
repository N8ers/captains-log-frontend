import React from "react";

import Header from "./components/Header";
import Logs from "./components/Logs";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newLogClicked: false,
      logInEditMode: false,
      dummyLogs: [
        { id: 1, starDate: 123, content: "ahhhhhhhhhh" },
        { id: 2, starDate: 637, content: "guhhhhhaj" },
        { id: 3, starDate: 987, content: "asdfff" }
      ]
    };
    this.handleNewLogToggle = this.handleNewLogToggle.bind(this);
    this.handleEditLog = this.handleEditLog.bind(this);
  }

  handleNewLogToggle() {
    this.setState({
      newLogClicked: !this.state.newLogClicked
    });
  }

  handleScrapLog() {
    console.log("handleScrapLog called...");
    this.handleNewLogToggle();
  }

  handleStoreLog() {
    console.log("handleStoreLog called...");
    this.handleNewLogToggle();
  }

  handleEditLog() {
    console.log("handleEditLog");
    this.setState({
      logInEditMode: !this.state.logInEditMode
    });
  }

  handleDeleteLog() {
    console.log("handleDeleteLog called...");
  }

  render() {
    return (
      <div>
        <Header
          newLogClicked={this.handleNewLogToggle}
          btnState={this.state}
        ></Header>
        <Logs
          dummyLogs={this.state.dummyLogs}
          btnState={this.state}
          handleEditLog={this.handleEditLog}
          handleDeleteLog={this.handleDeleteLog}
        ></Logs>
      </div>
    );
  }
}

export default App;
