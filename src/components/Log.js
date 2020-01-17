import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faEdit } from "@fortawesome/free-solid-svg-icons";
import Grid from "@material-ui/core/Grid";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import "./Log.css";

class Log extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logInEditMode: false,
      logContent: this.props.content
    };
    this.handleEditLog = this.handleEditLog.bind(this);
    this.handleEditingLog = this.handleEditingLog.bind(this);
  }

  handleEditLog() {
    console.log("handleeditlog");
    this.setState({
      logInEditMode: !this.state.logInEditMode
    });
  }

  handleSaveEdit(id, content) {
    this.props.handleEditLog(id, content);
    this.handleEditLog();
  }

  handleEditingLog(e) {
    this.setState({
      logContent: e.target.value
    });
  }

  render() {
    return (
      <div className="logBody">
        <Grid container spacing={3}>
          <Grid item xs={9}>
            <div className="logHeader">
              Captain's Log - stardate: {this.props.starDate}
            </div>
          </Grid>

          {this.state.logInEditMode && (
            <Grid item xs={1}>
              <button
                onClick={() =>
                  this.handleSaveEdit(this.props.id, this.state.logContent)
                }
              >
                save
              </button>
            </Grid>
          )}

          {!this.state.logInEditMode && (
            <Grid item xs={1}>
              <button onClick={this.handleEditLog}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
            </Grid>
          )}
          <Grid item xs={1}>
            <button onClick={() => this.props.handleDeleteLog(this.props.id)}>
              <FontAwesomeIcon icon={faTimesCircle} />
            </button>
          </Grid>
        </Grid>
        {!this.state.logInEditMode && <p>{this.props.content}</p>}
        {this.state.logInEditMode && (
          <form>
            <TextareaAutosize
              className="test"
              aria-label="minimum height"
              rowsMin={8}
              value={this.state.logContent}
              onChange={this.handleEditingLog}
            />
          </form>
        )}
      </div>
    );
  }
}

export default Log;
