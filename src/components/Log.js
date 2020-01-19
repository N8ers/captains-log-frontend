import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faEdit } from "@fortawesome/free-solid-svg-icons";
import Grid from "@material-ui/core/Grid";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";

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
        <Grid container spacing={1}>
          <Grid item sm={8} xs={12}>
            <div className="logHeader">
              Captain's Log - stardate: {this.props.starDate}
            </div>
          </Grid>

          {this.state.logInEditMode && (
            <Grid item sm={2} xs={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  this.handleSaveEdit(this.props.id, this.state.logContent)
                }
              >
                <span className="savebtn">save</span>
              </Button>
            </Grid>
          )}

          {!this.state.logInEditMode && (
            <Grid item sm={2} xs={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleEditLog}
              >
                <FontAwesomeIcon icon={faEdit} />
              </Button>
            </Grid>
          )}
          <Grid item sm={2} xs={6}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => this.props.handleDeleteLog(this.props.id)}
            >
              <FontAwesomeIcon icon={faTimesCircle} />
            </Button>
          </Grid>
        </Grid>
        {!this.state.logInEditMode && (
          <div className="contentcontainer">
            <p className="content">{this.props.content}</p>
            <div className="contentbuffer"></div>
          </div>
        )}
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
