import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ReactPlayer from "react-player";

const Videoplay = props => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };
  const time = c => {
    if (c >= 3600) {
      return parseInt(c / 3600) + ":" + (c % 3600) + " hrs";
    } else if (c >= 60) {
      return parseInt(c / 60) + ":" + (c % 60) + " mins";
    } else {
      return c + " sec";
    }
  };

  return (
    <div>
      <button
        onClick={toggle}
        style={{
          width: "100%",
          marginBottom: 20,
          backgroundColor: "gray",
          border: 1,
          overflow: "hidden"
        }}
      >
        <div
          style={{
            width: "26.5%",
            paddingTop: 2.5,
            paddingBottom: 2.5,
            backgroundColor: "blue",
            float: "left"
          }}
        >
          <img src={props.props.thumburl} width="300" height="150"></img>
        </div>
        <div
          style={{
            marginLeft: "25%",
            width: "75%",
            height: 155
          }}
        >
          <div
            className="title"
            style={{
              paddingLeft: 30,
              fontSize: 40,
              textAlign: "left",
              color: "greenyellow"
            }}
          >
            {props.props.title}
          </div>
          <div
            className="duration"
            style={{
              marginLeft: "3%",
              width: "40%",
              float: "left",
              textAlign: "left",

              color: "pink"
            }}
          >
            Duration: {time(props.props.time)}
          </div>
          <div
            className="category"
            style={{
              width: "50%",
              float: "right",
              paddingRight: "10%",

              color: "khaki",
              textAlign: "right"
            }}
          >
            Category: {props.props.category}
          </div>
          <div
            className="description"
            style={{
              width: "100%",
              marginLeft: "5%",
              textAlign: "left",
              fontSize: 18
            }}
          >
            Description:<br></br>
            <label style={{ color: "lightcyan" }}>
              {props.props.description}
            </label>
          </div>
        </div>
      </button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        style={{ backgroundColor: "red", width: "1080px" }}
        size="xl"
      >
        <ModalHeader>Click outside to close the video</ModalHeader>
        <ModalBody>
          <ReactPlayer
            width="1040px"
            height="740px"
            controls
            url={props.props.vidurl}
          ></ReactPlayer>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Videoplay;
