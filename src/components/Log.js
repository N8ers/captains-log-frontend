import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faEdit } from "@fortawesome/free-solid-svg-icons";
import Grid from "@material-ui/core/Grid";

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
            <button>
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </Grid>
          <Grid item xs={1}>
            <button>
              <FontAwesomeIcon icon={faTimesCircle} />
            </button>
          </Grid>
        </Grid>
        <p>{this.props.content}</p>
      </div>
    );
  }
}

export default Log;
