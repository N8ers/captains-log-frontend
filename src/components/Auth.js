import React from "react";
import ReactModal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

const customStyles = {
  content: {
    top: "30%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "300px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      form: "signin"
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleSigninSignupToggle = this.handleSigninSignupToggle.bind(this);
    this.testCredentials = this.testCredentials.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleSigninSignupToggle(e) {
    e.preventDefault();
    if (this.state.form === "signin") {
      this.setState({ form: "signup" });
    } else {
      this.setState({ form: "signin" });
    }
  }

  handleFormSubmission(e) {
    e.preventDefault();
    let username = e.target.elements[0].value;
    let password = e.target.elements[1].value;

    console.log("credentials", username, password);

    if (this.state.form === "signin") {
      this.testCredentials(username, password);
    } else {
      console.log("sign up");
    }
  }

  testCredentials = async (user, pw) => {
    console.log(user, pw);
    console.log(typeof user, typeof pw);
    let res;
    try {
      res = await axios({
        method: "get",
        url: `http://localhost:5000/signin`,
        headers: {
          username: user,
          password: pw
        }
      });
      this.props.handleSuccessfulLogin(res.data._id);
      this.handleCloseModal();
    } catch {
      console.log("login failed");
    }
  };

  render() {
    return (
      <div>
        <button onClick={this.handleOpenModal}>SignIn / SignUp</button>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example"
          style={customStyles}
          ariaHideApp={false}
        >
          <button className="exitModal" onClick={this.handleCloseModal}>
            <FontAwesomeIcon icon={faTimesCircle} />
          </button>

          {this.state.form === "signin" && <h1>SignIn</h1>}
          {this.state.form === "signup" && <h1>SignUp</h1>}

          {this.state.form === "signin" && (
            <Grid container spacing={3}>
              <form onSubmit={this.handleFormSubmission}>
                <div>
                  <label>
                    username
                    <input name="username" type="text" />
                  </label>
                </div>
                <div>
                  <label>
                    password
                    <input name="password" type="password" />
                  </label>
                </div>
                <input type="submit" value="SignIn" />
                <span>
                  <p>don't have an account?</p>
                  <button onClick={this.handleSigninSignupToggle}>
                    SignUp!
                  </button>
                </span>
              </form>
            </Grid>
          )}

          {this.state.form === "signup" && (
            <Grid container spacing={3}>
              <form>
                <div>
                  <span>SignUp</span>
                  <input type="text" />
                </div>
                <div>
                  <span>Password</span>
                  <input type="password" />
                </div>
                <button>submit!</button>
                <span>
                  <p>already have an account?</p>
                  <button onClick={this.handleSigninSignupToggle}>
                    SignIn!
                  </button>
                </span>
              </form>
            </Grid>
          )}
        </ReactModal>
      </div>
    );
  }
}

export default Auth;
