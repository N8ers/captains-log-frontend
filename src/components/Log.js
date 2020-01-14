import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faEdit } from "@fortawesome/free-solid-svg-icons";
import Grid from "@material-ui/core/Grid";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import "./Log.css";

class Log extends React.Component {
  render() {
    return (
      <div className="logBody">
        <Grid container spacing={3}>
          <Grid item xs={9}>
            <div className="logHeader">
              Captain's Log - stardate: {this.props.starDate}
            </div>
          </Grid>
          <Grid item xs={1}>
            <button onClick={this.props.handleEditLog}>
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </Grid>
          <Grid item xs={1}>
            <button onClick={this.props.handleDeleteLog}>
              <FontAwesomeIcon icon={faTimesCircle} />
            </button>
          </Grid>
        </Grid>
        {!this.props.logInEditMode && <p>{this.props.content}</p>}
        {this.props.logInEditMode && (
          <form>
            <TextareaAutosize
              className="test"
              aria-label="minimum height"
              rowsMin={8}
              placeholder={this.props.content}
            />
          </form>
        )}
      </div>
    );
  }
}

export default Log;
