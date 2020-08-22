import React, { Component } from "react";
import Axios from "axios";
import Videoplay from "./Videoplay";
import ReactPlayer from "react-player";
class Thumbs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isdata: false,
      play: ""
    };
  }
  link(x) {
    this.setState({ play: "x" });
  }

  async componentDidMount() {
    await Axios.get("http://localhost:5000/send", {
      headers: { Authorization: "bearer " + localStorage.getItem("auth-token") }
    })
      .then(response => response.data)
      .then(data => this.setState({ data: data, isdata: true }));
  }
  render() {
    return (
      <div style={{ paddingTop: "7%" }}>
        <div
          style={{
            backgroundColor: "white",
            borderRadius: 7,
            padding: "2%",
            alignItems: "left"
          }}
        >
          {this.state.isdata ? (
            this.state.data.map(item => {
              return <Videoplay props={item} />;
            })
          ) : (
            <label>NO VIDEOS</label>
          )}
        </div>
      </div>
    );
  }
}
export default Thumbs;
