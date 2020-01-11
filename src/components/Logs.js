import React from "react";

import NewLog from "./NewLog";
import Log from "./Log";

class Logs extends React.Component {
  render() {
    const dummyLogs = [
      { id: 1, starDate: 123, content: "ahhhhhhhhhh" },
      { id: 2, starDate: 637, content: "guhhhhhaj" },
      { id: 3, starDate: 987, content: "asdfff" }
    ];

    return (
      <div>
        <NewLog></NewLog>

        {dummyLogs.map(log => (
          <Log
            key={log.key}
            id={log.id}
            starDate={log.starDate}
            content={log.content}
          />
        ))}
      </div>
    );
  }
}

export default Logs;
