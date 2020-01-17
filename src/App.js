import React from "react";

import Header from "./components/Header";
import Logs from "./components/Logs";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newLogClicked: false,
      tempLogId: 4,
      dummyLogs: [
        { id: 1, starDate: 1677537989, content: "ahhhhhhhhhh" },
        { id: 2, starDate: 1479137234, content: "guhhhhhaj" },
        { id: 3, starDate: 1179137946, content: "asdfff" }
      ]
    };
    this.handleNewLogToggle = this.handleNewLogToggle.bind(this);
    this.handleDeleteLog = this.handleDeleteLog.bind(this);
    this.handleScrapLog = this.handleScrapLog.bind(this);
    this.handleStoreLog = this.handleStoreLog.bind(this);
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

  handleStoreLog(newLog) {
    console.log("handleStoreLog called...");
    let newLogs = this.state.dummyLogs.concat({
      id: this.state.tempLogId,
      starDate: Math.floor(Date.now() / 1000),
      content: newLog
    });
    this.setState({
      dummyLogs: newLogs,
      tempLogId: this.state.tempLogId + 1
    });
    this.handleNewLogToggle();
  }

  handleDeleteLog(id) {
    this.setState({
      dummyLogs: this.state.dummyLogs.filter(log => log.id !== id)
    });
  }

  handleEditLog(id, content) {
    let oldLogs = this.state.dummyLogs;

    for (let i = 0; i < oldLogs.length; i++) {
      if (oldLogs[i].id === id) {
        oldLogs[i].content = content;
      }
    }

    this.setState({
      dummyLogs: oldLogs
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
          editLog={this.handleEditLog}
        ></Logs>
      </div>
    );
  }
}

export default App;
