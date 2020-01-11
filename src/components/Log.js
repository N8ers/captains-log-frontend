import React from "react";

class Log extends React.Component {
  render() {
    return (
      <div>
        <h3>{this.props.starDate}</h3>
        <p>{this.props.content}</p>
      </div>
    );
  }
}

export default Log;
