import React from "react";

import NewLog from "./NewLog";
import Log from "./Log";
import "./Logs.css";

class Logs extends React.Component {
  render() {
    return (
      <div className="logsBody">
        {this.props.btnState.newLogClicked && <NewLog></NewLog>}

        {this.props.dummyLogs.map(log => (
          <Log
            key={log.id}
            id={log.id}
            starDate={log.starDate}
            content={log.content}
            handleEditLog={this.props.handleEditLog}
            handleDeleteLog={this.props.handleDeleteLog}
          />
        ))}
        <br />
      </div>
    );
  }
}

export default Logs;
