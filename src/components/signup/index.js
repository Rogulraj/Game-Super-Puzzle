import { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import "./index.css";

export default class Signup extends Component {
  state = { username: "", password: "" };

  onChangeUserName = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  onChangeUserPassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  signupTriggered = () => {
    const { username, password } = this.state;

    if (username !== "" && password !== "") {
      const userDetails = { username, password };
      const convertToString = JSON.stringify(userDetails);
      localStorage.setItem("userDetails", convertToString);
      const { history } = this.props;
      history.replace("/");
    }
  };

  render() {
    const { username, password } = this.state;
    const userValidate = JSON.parse(localStorage.getItem("userDetails"));

    return (
      <div className="signup-main-container">
        <div className="signup-login-card">
          <h1 className="signup-greeting">Welcome Back!</h1>
          <Link to="/login">
            <button className="signup-greeting-btn">Signin</button>
          </Link>
        </div>
        <div className="signup-card">
          <h1 className="signup-heading">Create an Account</h1>

          <label htmlFor="mail" className="signup-email-label">
            Email Id
          </label>
          <input
            type="email"
            id="mail"
            value={username}
            onChange={this.onChangeUserName}
            className="signup-email-input"
          />
          <label htmlFor="password" className="signup-password-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="signup-password-input"
            value={password}
            onChange={this.onChangeUserPassword}
          />

          <div className="signup-btn-card">
            <button
              className="signup-card-signup-btn"
              onClick={this.signupTriggered}
            >
              Signup
            </button>
            <p className="signup-or-text">OR</p>
            <Link to="/login" className="signup-card-signin-btn">
              <p>Signin</p>
            </Link>
            <p className="singin-discription">If you already have an account</p>
          </div>
        </div>
      </div>
    );
  }
}
