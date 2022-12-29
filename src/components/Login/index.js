import { Component } from "react";

import { Link } from "react-router-dom";

import "./index.css";

export default class Login extends Component {
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

  render() {
    const { username, password } = this.state;
    console.log(username, password);
    return (
      <div className="signin-main-container">
        <div className="signin-card">
          <h1 className="signin-heading">Login</h1>

          <label htmlFor="mail" className="signin-email-label">
            Email Id
          </label>
          <input
            type="email"
            id="mail"
            value={username}
            onChange={this.onChangeUserName}
            className="signin-email-input"
          />
          <label htmlFor="password" className="signin-password-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="signin-password-input"
            value={password}
            onChange={this.onChangeUserPassword}
          />

          <div className="signin-btn-card">
            <button className="signin-card-signup-btn">Signin</button>
            <p className="signin-or-text">OR</p>
            <Link to="/signup" className="signin-card-signin-btn">
              <p>Signup</p>
            </Link>
            <p className="signup-discription">
              If you already not have an account
            </p>
          </div>
        </div>
        <div className="signin-login-card">
          <h1 className="signin-greeting">Not Have an Account!</h1>
          <Link to="/signup">
            <button className="signin-greeting-btn">Signup</button>
          </Link>
        </div>
      </div>
    );
  }
}
