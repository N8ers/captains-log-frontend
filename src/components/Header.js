import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Auth from "./Auth";
import "./Header.css";

class Header extends React.Component {
  render() {
    // let logginStatus;
    // this.props.btnState.userIsLoggedIn
    //   ? (logginStatus = "yes")
    //   : (logginStatus = "no");
    return (
      <div className="header">
        <Grid className="header-content" container spacing={3}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <h1 className="title">Captain's Log</h1>
          </Grid>
          <Grid item xs={1}>
            <br />
            {this.props.btnState.userIsLoggedIn && (
              <Button
                variant="contained"
                color="secondary"
                onClick={this.props.handleLogout}
              >
                logout
              </Button>
            )}

            {!this.props.btnState.userIsLoggedIn && (
              <Auth handleSuccessfulLogin={this.props.handleSuccessfulLogin} />
            )}
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>

        {!this.props.btnState.newLogClicked && (
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={this.props.newLogClicked}
            >
              Create New Log
            </Button>
          </div>
        )}

        <br />

        {this.props.btnState.newLogClicked && <div></div>}

        {/* <div>
          <hr />
          <p>just for dev</p>
          <button onClick={this.props.loginUser}>Log In</button>
          <span>loggedin: {logginStatus}</span>
        </div> */}
      </div>
    );
  }
}

export default Header;
