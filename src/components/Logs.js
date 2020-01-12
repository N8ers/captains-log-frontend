import React from "react";

import NewLog from "./NewLog";
import Log from "./Log";
import "./Logs.css";

class Logs extends React.Component {
  render() {
    const dummyLogs = [
      { id: 1, starDate: 123, content: "ahhhhhhhhhh" },
      { id: 2, starDate: 637, content: "guhhhhhaj" },
      { id: 3, starDate: 987, content: "asdfff" }
    ];

    return (
      <div className="logsBody">
        <NewLog></NewLog>

        {dummyLogs.map(log => (
          <Log
            key={log.key}
            id={log.id}
            starDate={log.starDate}
            content={log.content}
          />
        ))}
        <br />
      </div>
    );
  }
}

export default Logs;
