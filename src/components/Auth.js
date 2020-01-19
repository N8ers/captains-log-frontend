import React from "react";
import ReactModal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import axios from "axios";

import "./Auth.css";

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
      form: "signin",
      loading: false,
      signinError: false,
      signupError: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleSigninSignupToggle = this.handleSigninSignupToggle.bind(this);
    this.testCredentials = this.testCredentials.bind(this);
    this.handleSigninForm = this.handleSigninForm.bind(this);
    this.handleSignupForm = this.handleSignupForm.bind(this);
    this.submitNewUser = this.submitNewUser.bind(this);
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
      this.setState({ form: "signup", signinError: false, signupError: false });
    } else {
      this.setState({ form: "signin", signinError: false, signupError: false });
    }
  }

  handleSigninForm(e) {
    e.preventDefault();
    let username = e.target.elements[0].value;
    let password = e.target.elements[1].value;
    this.testCredentials(username, password);
  }

  testCredentials = async (user, pw) => {
    await this.setState({
      loading: true,
      signinError: false
    });
    let res;
    try {
      res = await axios({
        method: "get",
        url: `https://captains-log-backend.herokuapp.com/signin`,
        headers: {
          username: user,
          password: pw
        }
      });
      this.props.handleSuccessfulLogin(res.data._id);
      this.handleCloseModal();
    } catch {
      this.setState({
        signinError: true
      });
    }
    this.setState({
      loading: false
    });
  };

  handleSignupForm(e) {
    e.preventDefault();
    let username = e.target.elements[0].value;
    let password = e.target.elements[1].value;
    console.log("handleSignupForm: ", username, password);
    this.submitNewUser(username, password);
  }

  submitNewUser = async (user, pw) => {
    await this.setState({
      loading: true,
      signupError: false
    });
    let res;
    try {
      res = await axios({
        method: "get",
        url: `https://captains-log-backend.herokuapp.com/signup`,
        headers: {
          username: user,
          password: pw
        }
      });
      console.log("res: ", res);
      this.props.handleSuccessfulLogin(res.data._id);
      this.handleCloseModal();
    } catch {
      this.setState({
        signupError: true
      });
    }
    this.setState({
      loading: false
    });
  };

  render() {
    return (
      <div>
        <br />
        <Button
          variant="contained"
          color="secondary"
          onClick={this.handleOpenModal}
        >
          SignIn
        </Button>

        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example"
          style={customStyles}
          ariaHideApp={false}
        >
          <Button
            variant="contained"
            color="secondary"
            className="exitModal"
            onClick={this.handleCloseModal}
          >
            <FontAwesomeIcon icon={faTimesCircle} />
          </Button>

          <br />

          {this.state.form === "signin" && (
            <h1 className="formheader">SignIn</h1>
          )}
          {this.state.signinError && (
            <p className="p-error">incorrect credentials</p>
          )}
          {this.state.form === "signup" && (
            <h1 className="formheader">SignUp</h1>
          )}
          {this.state.signupError && <p className="p-error">username taken</p>}

          {this.state.form === "signin" && (
            <form onSubmit={this.handleSigninForm}>
              <div>
                <label>
                  <TextField
                    id="standard-basic"
                    name="username"
                    type="text"
                    placeholder="username"
                  />
                </label>
              </div>
              <div>
                <label>
                  <TextField
                    id="standard-basic"
                    name="password"
                    type="password"
                    placeholder="password"
                  />
                </label>
              </div>
              <br />
              {/* <input type="sub/mit" value="SignIn" /> */}
              <Button variant="contained" color="primary" type="submit">
                Sign In!
              </Button>
              <span>
                <p>don't have an account?</p>
                {/* <button onClick={this.handleSigninSignupToggle}>SignUp!</button> */}
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.handleSigninSignupToggle}
                >
                  Sign Up!
                </Button>
              </span>
            </form>
          )}

          {this.state.form === "signup" && (
            <form onSubmit={this.handleSignupForm}>
              <div>
                <label>
                  <TextField
                    id="standard-basic"
                    name="username"
                    type="text"
                    placeholder="username"
                  />
                </label>
              </div>
              <div>
                <label>
                  <TextField
                    id="standard-basic"
                    name="password"
                    type="password"
                    placeholder="password"
                  />
                </label>
              </div>
              <br />
              {/* <input type="submit" value="SignUp" /> */}
              <Button variant="contained" color="primary" type="submit">
                Sign In!
              </Button>
              <span>
                <p>already have an account?</p>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.handleSigninSignupToggle}
                >
                  Sign Up!
                </Button>
              </span>
            </form>
          )}
          {this.state.loading && <CircularProgress />}
        </ReactModal>
      </div>
    );
  }
}

export default Auth;
