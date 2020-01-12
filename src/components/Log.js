import React from "react";

import "./Log.css";

class Log extends React.Component {
  render() {
    return (
      <div className="logBody">
        <h3>{this.props.starDate}</h3>
        <p>{this.props.content}</p>
      </div>
    );
  }
}

export default Log;
