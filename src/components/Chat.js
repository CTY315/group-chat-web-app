import React, { Component } from "react";
import { auth, db } from "../firebase";
import { Container, InputGroup, FormControl, Button } from "react-bootstrap";
import "../App.css";

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      user: auth().currentUser,
      yourName: "",
      messages: [],
      newMessage: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addMessage = this.addMessage.bind(this);
  }

  async componentDidMount() {
    //fetch message data from fire store
    try {
      const user = auth().currentUser;
      // console.log(user);
      let previousMsg = [];
      await db
        .collection("chat")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            previousMsg.push(doc.data());
          });
        });
      previousMsg.sort((a, b) => a.timeStamp - b.timeStamp);
      this.setState({ messages: previousMsg, user: user });

      //setState with new message data
    } catch (error) {
      console.log(error);
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.addMessage(this.state.newMessage);
    this.setState({
      messages: [...this.state.messages, this.state.newMessage],
      newMessage: "",
      yourName: "",
    });
    this.componentDidMount();

    // console.log(this.state);
  }

  async addMessage(message) {
    try {
      const addedMsg = await db.collection("chat").add({
        email: this.state.user.email,
        message: message,
        timeStamp: Date.now(),
        sendDate: new Date().toDateString(),
        sendTime: new Date().toLocaleTimeString(),
      });
      // console.log(addedMsg);

      return addedMsg;
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    if (this.state.user) {
      return (
        <Container>
          <div>
            {this.state.user ? (
              <h2>user : {this.state.user.email}</h2>
            ) : (
              <h2>Please login to send message</h2>
            )}
          </div>

          <Container
            className="messaging-app"
            style={{ backgroundColor: "#EBFAFC" }}
          >
            <Container className="textDisplayArea">
              {this.state.messages &&
                this.state.messages.map((message, idx) => {
                  return (
                    <div className="eachMsg" key={idx}>
                      <p
                        className={
                          this.state.user.email === message.email
                            ? "currentUser"
                            : "otherUser"
                        }
                      >
                        {message.message} <br />{" "}
                        <small>by {message.email} </small> <br />
                        <small> on {message.sendDate}</small>
                        <small> at {message.sendTime}</small>
                      </p>
                    </div>
                  );
                })}
            </Container>
            <br />
            <div>
              <InputGroup className="mb-3">
                <FormControl
                  name="newMessage"
                  placeholder="message"
                  aria-label="message"
                  aria-describedby="basic-addon2"
                  onChange={this.handleChange}
                  value={this.state.newMessage}
                />

                <InputGroup.Append>
                  <Button
                    variant="outline-warning"
                    type="submit"
                    onClick={this.handleSubmit}
                    disabled={!this.state.user}
                  >
                    ᗌ
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </div>
            <br />
          </Container>
        </Container>
      );
    } else {
      return (
        <div>
          <Container>
            <h1 style={{ textAlign: "center" }}>Please Login</h1>
          </Container>
        </div>
      );
    }
  }
}

export default Chat;
