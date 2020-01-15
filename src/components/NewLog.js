import React from "react";

import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import "./NewLog.css";

class NewLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newLog: "captain's log..."
    };
    this.handleNewLogInput = this.handleNewLogInput.bind(this);
  }

  handleNewLogInput(e) {
    this.setState({
      newLog: e.target.value
    });
  }

  render() {
    console.log(this.props);
    return (
      <div className="newFormBody">
        <button onClick={() => this.props.storeLog(this.state.newLog)}>
          Store Log
        </button>
        <button onClick={this.props.scrapLog}>Scrap Log</button>
        <form>
          <TextareaAutosize
            className="test"
            aria-label="minimum height"
            rowsMin={8}
            value={this.state.newLog}
            onChange={e => this.handleNewLogInput(e)}
          />
        </form>
      </div>
    );
  }
}

export default NewLog;
