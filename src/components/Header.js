import React from "react";

import "./Header.css";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <h1>Captain's Log</h1>
        {!this.props.btnState.newLogClicked && (
          <div>
            <button onClick={this.props.newLogClicked}>Create New Log</button>
          </div>
        )}

        {this.props.btnState.newLogClicked && <div></div>}
      </div>
    );
  }
}

export default Header;
