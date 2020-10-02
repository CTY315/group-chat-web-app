import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Chat from "./components/Chat";
import Logout from "./components/Logout";
import "./App.css";
import { Button, ButtonGroup } from "react-bootstrap";
import { auth } from "./firebase";

class App extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout() {
    return auth().signOut();
  }
  render() {
    return (
      <Router>
        <div className="App" style={{ backgroundColor: "#CFE5DA" }}>
          <h1 style={{ padding: "5px" }}>Group Chat web app</h1>
          <ButtonGroup
            aria-label="Basic example"
            className="signupBTN"
            style={{ marginBottom: "30px" }}
          >
            <Button variant="info" style={{ marginRight: "20px" }}>
              <Link to="signup">Signup</Link>
            </Button>
            <Button variant="success" style={{ marginRight: "20px" }}>
              <Link to="/login">Login</Link>
            </Button>
            <Button variant="warning" style={{ marginRight: "20px" }}>
              <Link to="/chat">Chat</Link>
            </Button>
            <Button
              variant="light"
              onClick={this.logout}
              style={({ marginRight: "10px" }, { backgroundColor: "#FED3ED" })}
            >
              <Link to="/logout">Logout</Link>
            </Button>
          </ButtonGroup>
        </div>
        <div>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/chat" component={Chat} />
        </div>
      </Router>
    );
  }
}

export default App;
