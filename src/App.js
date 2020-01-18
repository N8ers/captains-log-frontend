import React from "react";
import axios from "axios";

import Header from "./components/Header";
import Logs from "./components/Logs";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newLogClicked: false,
      userIsLoggedIn: true,
      tempLogId: 4,
      dummyLogs: [
        { id: 1, starDate: 1677537989, content: "ahhhhhhhhhh" },
        { id: 2, starDate: 1479137234, content: "guhhhhhaj" },
        { id: 3, starDate: 1179137946, content: "asdfff" }
      ],
      dbLogs: []
    };
    this.handleNewLogToggle = this.handleNewLogToggle.bind(this);
    this.handleDeleteLog = this.handleDeleteLog.bind(this);
    this.handleScrapLog = this.handleScrapLog.bind(this);
    this.handleStoreLog = this.handleStoreLog.bind(this);
    this.handleEditLog = this.handleEditLog.bind(this);
    this.getAllLogs = this.getAllLogs.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  loginUser() {
    this.setState({
      userIsLoggedIn: !this.state.userIsLoggedIn
    });
    console.log("userIdLoggedIn: ", this.state.userIsLoggedIn);
  }

  getAllLogs() {
    axios
      .get("http://localhost:5000/logs")
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentWillMount() {
    if (this.state.userIsLoggedIn) {
      let logs = this.getAllLogs();
      this.setState({
        dbLogs: logs
      });
    }
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
          loginUser={this.loginUser}
          btnState={this.state}
        ></Header>

        {this.state.userIsLoggedIn && (
          <Logs
            loginStatus={this.state.userIsLoggedIn}
            logs={this.state.dbLogs}
            btnState={this.state}
            handleEditLog={this.handleEditLog}
            handleDeleteLog={this.handleDeleteLog}
            storeLog={this.handleStoreLog}
            scrapLog={this.handleScrapLog}
            editLog={this.handleEditLog}
          ></Logs>
        )}

        {!this.state.userIsLoggedIn && (
          <Logs
            loginStatus={this.state.userIsLoggedIn}
            logs={this.state.dummyLogs}
            btnState={this.state}
            handleEditLog={this.handleEditLog}
            handleDeleteLog={this.handleDeleteLog}
            storeLog={this.handleStoreLog}
            scrapLog={this.handleScrapLog}
            editLog={this.handleEditLog}
          ></Logs>
        )}
      </div>
    );
  }
}

export default App;
