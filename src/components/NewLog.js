import React from "react";

import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import "./NewLog.css";

class NewLog extends React.Component {
  render() {
    return (
      <div className="newFormBody">
        <form>
          <TextareaAutosize
            className="test"
            aria-label="minimum height"
            rowsMin={8}
            placeholder="Minimum 3 rows"
          />
        </form>
      </div>
    );
  }
}

export default NewLog;
