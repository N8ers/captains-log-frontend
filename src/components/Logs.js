import React from "react";

import NewLog from "./NewLog";
import Log from "./Log";
import "./Logs.css";

class Logs extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div className="logsBody">
        {this.props.btnState.newLogClicked && (
          <NewLog
            scrapLog={this.props.scrapLog}
            storeLog={this.props.storeLog}
          />
        )}

        {!this.props.loginStatus &&
          this.props.logs.map(log => (
            <Log
              key={log.id}
              id={log.id}
              starDate={log.starDate}
              content={log.content}
              handleEditLog={this.props.handleEditLog}
              handleDeleteLog={this.props.handleDeleteLog}
              handleEditLog={this.props.handleEditLog}
            />
          ))}

        {/* this needs to be made async */}

        {/* {this.props.loginStatus &&
          this.props.logs.map(log => (
            <Log
              key={log.id}
              id={log.id}
              starDate={log.starDate}
              content={log.content}
              handleEditLog={this.props.handleEditLog}
              handleDeleteLog={this.props.handleDeleteLog}
              handleEditLog={this.props.handleEditLog}
            />
          ))
          } */}
        <br />
      </div>
    );
  }
}

export default Logs;
