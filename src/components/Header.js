import React from "react";

import "./Header.css";

class Header extends React.Component {
  render() {
    let logginStatus;
    this.props.btnState.userIsLoggedIn
      ? (logginStatus = "yes")
      : (logginStatus = "no");
    return (
      <div className="header">
        <h1>Captain's Log</h1>
        {!this.props.btnState.newLogClicked && (
          <div>
            <button onClick={this.props.newLogClicked}>Create New Log</button>
          </div>
        )}

        {this.props.btnState.newLogClicked && <div></div>}

        <div>
          <button onClick={this.props.loginUser}>Log In</button>
          <span>loggedin: {logginStatus}</span>
        </div>
      </div>
    );
  }
}

export default Header;
