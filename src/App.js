import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Modal from "react-modal";
import ADDModal from "./parts/ADDModal";
import Tabs from "./parts/Tabs";
import Axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
class App extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      isdata: false,
      isLogin: false,
      email: "",
      password: "",
      isSignup: false,
      confp: "",
      name: ""
    };
  }
  componentDidMount() {
    if (localStorage.getItem("auth-token")) this.setState({ isLogin: true });
  }
  signUp = () => {
    if (
      this.checkPassword(this.state.confp) ==
        this.checkPassword(this.state.password) &&
      this.checkEmail(this.state.email)
    ) {
      const b = new FormData();
      b.append("email", this.state.email);
      b.append("password", this.state.password);
      b.append("name", this.state.name);
      Axios.post("http://localhost:5000/newuser", b).then(res =>
        window.alert(res)
      );
      this.setState({ isSignup: false, email: "", password: "" });
    }
  };
  checkEmail = emai => {
    if (
      !emai.includes("@") ||
      !emai.includes(".") ||
      emai.indexOf(".") - emai.indexOf("@") < 4 ||
      emai.indexOf(".") < 2
    ) {
      window.alert("enter a valid email");
      return false;
    } else {
      return true;
    }
  };
  checkPassword = pass => {
    if (
      pass.match(/[a-z]/) &&
      pass.match(/[A-Z]/) &&
      pass.match(/[0-9]/) &&
      pass.match(/[^a-zA-Z\d]/) &&
      pass.length > 5
    )
      return true;
    else {
      window.alert(
        "Password should contain atleast\n*a Digit\n*a Special Charecter\n*a Capital Letter\n*a Small Letter\n*length 6"
      );
      return false;
    }
  };
  send = () => {
    if (
      this.checkEmail(this.state.email) &&
      this.checkPassword(this.state.password)
    ) {
      const b = new FormData();
      b.append("email", this.state.email);
      b.append("password", this.state.password);
      Axios.post("http://localhost:5000/login", b)
        .then(res =>
          localStorage.setItem("auth-token", res.data.b["auth-token"])
        )
        .catch(err => window.alert(err));
      setTimeout(() => {
        if (localStorage.getItem("auth-token"))
          this.setState({ isLogin: true });
      }, 2000);
      this.setState({ email: "", password: "" });
    }
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Router>
            {this.state.isLogin ? (
              <div style={{ margin: 30 }}>
                <Tabs />
              </div>
            ) : this.state.isSignup ? (
              <div
                style={{
                  marginTop: "10%",
                  borderRadius: 25,
                  backgroundColor: "lightcyan",
                  paddingLeft: "10%",
                  paddingRight: "10%",
                  paddingTop: "4%",
                  textAlign: "left",
                  width: 650
                }}
              >
                <div style={{ color: "black" }}>
                  <div style={{ paddingLeft: "5%" }}>
                    <label>Name</label>
                    <br></br>
                    <input
                      type="text"
                      value={this.state.name}
                      placeholder="Name"
                      onChange={e => {
                        this.setState({ name: e.target.value });
                      }}
                    ></input>
                  </div>
                  <div style={{ paddingLeft: "5%" }}>
                    <label>Email</label>
                    <br></br>
                    <input
                      type="email"
                      id="email"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={e => {
                        this.setState({ email: e.target.value });
                      }}
                    ></input>
                  </div>
                  <div style={{ paddingLeft: "5%" }}>
                    <label>Password</label>
                    <br></br>
                    <input
                      type="password"
                      value={this.state.password}
                      placeholder="Password"
                      onChange={e => {
                        this.setState({ password: e.target.value });
                      }}
                    ></input>
                  </div>
                  <div style={{ paddingLeft: "5%" }}>
                    <label>Password Again</label>
                    <br></br>
                    <input
                      type="password"
                      placeholder="Again Password"
                      value={this.state.confp}
                      onChange={e => {
                        this.setState({ confp: e.target.value });
                      }}
                    ></input>
                  </div>
                  <br></br>
                  <br></br>
                  <div style={{ paddingLeft: "30%" }}>
                    <button onClick={e => this.signUp()}>signup</button>
                  </div>
                  <br></br>
                </div>
              </div>
            ) : (
              <div
                style={{
                  marginTop: "10%",
                  borderRadius: 25,
                  backgroundColor: "lightcyan",
                  paddingLeft: "10%",
                  paddingRight: "10%",
                  paddingTop: "4%",
                  textAlign: "left",
                  width: 650
                }}
              >
                <div style={{ color: "black" }}>
                  <div style={{ paddingLeft: "5%" }}>
                    <label>Email</label>
                    <br></br>
                    <input
                      type="email"
                      id="email"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={e => {
                        this.setState({ email: e.target.value });
                      }}
                    ></input>
                  </div>
                  <div style={{ paddingLeft: "5%" }}>
                    <label>Password</label>
                    <br></br>
                    <input
                      type="password"
                      value={this.state.password}
                      placeholder="Password"
                      onChange={e => {
                        this.setState({ password: e.target.value });
                      }}
                    ></input>
                  </div>
                  <br></br>
                  <br></br>
                  <div style={{ paddingLeft: "30%" }}>
                    <button onClick={e => this.send()}>login</button>
                  </div>
                  <br></br>
                  <br></br>
                  <label>Click here to Sign up ==></label>
                  <button
                    onClick={() => {
                      this.setState({
                        isSignup: true,
                        email: "",
                        password: ""
                      });
                    }}
                  >
                    Signup
                  </button>
                  <br></br>
                  <br></br>
                </div>
              </div>
            )}
          </Router>
        </header>
      </div>
    );
  }
}
export default App;
