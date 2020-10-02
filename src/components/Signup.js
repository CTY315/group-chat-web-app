import React, { Component } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { auth } from "../firebase";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      error: "",
    };
    this.signUpWithGoogle = this.signUpWithGoogle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async signUpWithGoogle() {
    try {
      const provider = await new auth.GoogleAuthProvider();
      const result = await auth().signInWithPopup(provider);
      await this.props.history.push("/chat");

      return result;
    } catch (err) {
      console.log(err);
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    try {
      await this.signUp(this.state.email, this.state.password);
      await this.props.history.push("/chat");
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  signUp(email, password) {
    return auth().createUserWithEmailAndPassword(email, password);
  }

  render() {
    return (
      <div>
        <Container style={{ marginTop: "30px" }}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={this.handleChange}
                name="email"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              disabled={!this.state.email || !this.state.password}
            >
              Sign up
            </Button>
          </Form>
          <br />
          <h4>or</h4>
          <br />
          <Button
            variant="danger"
            type="submit"
            onClick={this.signUpWithGoogle}
          >
            Sign in with Google
          </Button>
        </Container>
      </div>
    );
  }
}

export default Signup;
