import React from "react";

import Header from "./components/Header";
import Logs from "./components/Logs";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newLogClicked: false,
      dummyLogs: [
        { id: 1, starDate: 123, content: "ahhhhhhhhhh" },
        { id: 2, starDate: 637, content: "guhhhhhaj" },
        { id: 3, starDate: 987, content: "asdfff" }
      ]
    };
    this.handleNewLogToggle = this.handleNewLogToggle.bind(this);
    this.handleDeleteLog = this.handleDeleteLog.bind(this);
    this.handleScrapLog = this.handleScrapLog.bind(this);
    this.handleStoreLog = this.handleStoreLog.bind(this);
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

  handleStoreLog(newLog) {
    console.log("handleStoreLog called...");
    let newLogs = this.state.dummyLogs.concat({
      id: 4,
      starDate: 42069,
      content: newLog
    });
    this.setState({
      dummyLogs: newLogs
    });
    this.handleNewLogToggle();
  }

  handleDeleteLog(id) {
    this.setState({
      dummyLogs: this.state.dummyLogs.filter(log => log.id !== id)
    });
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
          storeLog={this.handleStoreLog}
          scrapLog={this.handleScrapLog}
        ></Logs>
      </div>
    );
  }
}

export default App;
