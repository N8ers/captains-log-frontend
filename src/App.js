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
      userIsLoggedIn: false,
      userid: "5e237d935f5bc44ba4bc3765",
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
    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    if (this.state.userIsLoggedIn) {
      this.loginUser();
    }
  }

  handleLogout() {
    this.setState({
      userid: "",
      userIsLoggedIn: false
    });
  }

  handleSuccessfulLogin(id) {
    this.setState({
      userid: id,
      userIsLoggedIn: !this.state.userIsLoggedIn
    });
    this.getAllLogs(this.state.userid);
  }

  loginUser = async () => {
    await this.setState({
      userIsLoggedIn: !this.state.userIsLoggedIn
    });
    if (this.state.userIsLoggedIn) {
      this.getAllLogs(this.state.userid);
    }
  };

  getAllLogs = async userid => {
    let res = await axios.get(`http://localhost:5000/logs/${userid}`);
    let logs = res.data;
    await this.setState({
      dbLogs: logs
    });
  };

  handleNewLogToggle() {
    this.setState({
      newLogClicked: !this.state.newLogClicked
    });
  }

  handleScrapLog() {
    this.handleNewLogToggle();
  }

  handleStoreLog = async newLog => {
    if (!this.state.userIsLoggedIn) {
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

    if (this.state.userIsLoggedIn) {
      await axios({
        method: "post",
        url: `http://localhost:5000/log`,
        data: {
          content: newLog,
          starDate: Math.floor(Date.now() / 1000),
          userid: this.state.userid
        }
      });
      this.getAllLogs(this.state.userid);
      this.handleNewLogToggle();
    }
  };

  handleDeleteLog = async id => {
    if (!this.state.userIsLoggedIn) {
      this.setState({
        dummyLogs: this.state.dummyLogs.filter(log => log.id !== id)
      });
    }
    if (this.state.userIsLoggedIn) {
      await axios.delete(`http://localhost:5000/log/${id}`);
      await this.getAllLogs(this.state.userid);
    }
  };

  handleEditLog = async (id, content) => {
    if (!this.state.userIsLoggedIn) {
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
    if (this.state.userIsLoggedIn) {
      await axios({
        method: "patch",
        url: `http://localhost:5000/log/${id}`,
        data: {
          content: content
        }
      });
      this.getAllLogs(this.state.userid);
    }
  };

  render() {
    return (
      <div>
        <Header
          newLogClicked={this.handleNewLogToggle}
          loginUser={this.loginUser}
          btnState={this.state}
          handleSuccessfulLogin={this.handleSuccessfulLogin}
          handleLogout={this.handleLogout}
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
