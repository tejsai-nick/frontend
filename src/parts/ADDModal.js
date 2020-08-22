import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";
const list = ["Gaming", "Music", "Food", "Travel", "Comedy", "Entertainment"];
function ADDModal() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState();
  const [isfile, setIsFile] = useState(false);
  const [redi, setRedi] = useState(false);
  const [val, setVal] = useState("select");
  const [desc, setDesc] = useState("");
  const [td, setTd] = useState();
  const [isImg, setImg] = useState();
  const [sen, setSen] = useState();
  const send = async event => {
    if (isfile && title && val != "select" && desc && sen) {
      const data = new FormData();
      data.append("title", title);
      data.append("file", file);
      data.append("category", val);
      data.append("description", desc);
      if (typeof sen == "string") {
        data.append("move", sen);
        data.append("type", "move");
      } else {
        data.append("image", sen);
        data.append("type", "image");
      }
      Axios.post("http://localhost:5000/", data, {
        headers: {
          Authorization: "bearer " + localStorage.getItem("auth-token")
        }
      })
        .then(res => {
          window.alert(res.data);
          if (res.data == "Your file had been uploaded") setRedi(true);
        })
        .catch(err => window.alert(err));
    } else {
      window.alert("enter and upload all fields");
    }
  };
  const thum = async () => {
    await Axios.get("http://localhost:5000/hello", {
      headers: { Authorization: "bearer " + localStorage.getItem("auth-token") }
    })
      .then(response => response.data)
      .then(data => {
        setTd(data.d);
      });
    console.log(td);
    setImg(false);
    setSen(false);
  };
  return (
    <div style={{ paddingTop: "7%" }}>
      <div
        style={{ backgroundColor: "white", color: "black", borderRadius: 23 }}
      >
        <div
          style={{
            padding: "2%",
            width: "45%",
            float: "left"
          }}
        >
          <label style={{ fontSize: 30 }}>Title:-</label>
          <sup>
            <span style={{ color: "red" }}>*</span>
          </sup>
          <input
            type="text"
            style={{
              borderRadius: 5,
              border: "1px solid black",
              marginLeft: 10
            }}
            value={title}
            onChange={event => {
              setTitle(event.target.value);
            }}
          />
          <div
            style={{
              textAlign: "left",
              paddingLeft: "8%",
              paddingTop: "2%",
              float: "left"
            }}
          >
            <label style={{ fontSize: 30 }}>Category:-</label>
            <sup>
              <span style={{ color: "red" }}>*</span>
            </sup>
          </div>
          <div style={{ float: "left", paddingTop: "4%", paddingLeft: 20 }}>
            <select value={val} onChange={e => setVal(e.target.value)}>
              <option selected disabled>
                select
              </option>
              {list.map(e => (
                <option>{e}</option>
              ))}
            </select>
          </div>
        </div>
        <div style={{ width: "48%", paddingTop: "2%", float: "left" }}>
          <div
            style={{
              float: "left",
              marginTop: 40
            }}
          >
            <label style={{ fontSize: 30 }}>Description:-</label>
            <sup>
              <span style={{ color: "red" }}>*</span>
            </sup>
          </div>
          <div style={{ width: "50%", marginLeft: 10, float: "left" }}>
            <textarea
              style={{ borderRadius: 5, width: 300, height: 150 }}
              value={desc}
              onChange={e => setDesc(e.target.value)}
            ></textarea>
          </div>
        </div>

        <input
          type="file"
          style={{ paddingLeft: "18%", paddingBottom: "50" }}
          onChange={event => {
            const file = event.target.files[0];
            setTd(false);
            setFile(file);
            setIsFile(true);
            const d = new FormData();
            d.append("file", file);
            console.log(file);
            Axios.post("http://localhost:5000/video", d, {
              headers: {
                Authorization: "bearer " + localStorage.getItem("auth-token")
              }
            });
            if (typeof file != "undefined") {
              setTimeout(() => {
                thum();
              }, 2500);
            } else {
              setTd(false);
            }
          }}
        />

        <br></br>
        {td ? (
          isImg ? (
            <div style={{ paddingTop: "50" }}>
              <br></br>
              <label style={{ color: "blue" }}>
                You choosed this as the thumbnail
              </label>
              <br></br>
              <img src={isImg} width={1050}></img>
            </div>
          ) : (
            <div style={{ paddingTop: "50" }}>
              <br></br>
              <label style={{ color: "green" }}>
                select an image or upload image for the thumbnail
              </label>
              <br></br>

              <div style={{ width: "30%", float: "left", marginLeft: 50 }}>
                <button
                  onClick={() => {
                    setImg(td.thum1);
                    setSen("s1");
                  }}
                >
                  <img src={td.thum1} width={350}></img>
                </button>
              </div>
              <div style={{ width: "30%", float: "left" }}>
                <button
                  onClick={() => {
                    setImg(td.thum2);
                    setSen("s2");
                  }}
                >
                  <img src={td.thum2} width={350}></img>
                </button>
              </div>
              <div style={{ width: "30%", float: "left" }}>
                <button
                  onClick={() => {
                    setImg(td.thum3);
                    setSen("s3");
                  }}
                >
                  <img src={td.thum3} width={350}></img>
                </button>
              </div>

              <br></br>
              <input
                type="file"
                onChange={e => {
                  setSen(e.target.files[0]);
                  const reader = new FileReader();
                  reader.onload = () => {
                    if (reader.readyState == 2) {
                      setImg(reader.result);
                      console.log(reader.result);
                    }
                  };
                  reader.readAsDataURL(e.target.files[0]);
                }}
              ></input>
            </div>
          )
        ) : (
          <span></span>
        )}
        <br></br>
        <button
          style={{ borderRadius: 5, backgroundColor: "blue", color: "white" }}
          onClick={e => send(e)}
        >
          Add Video
        </button>
        <br></br>
        {redi ? <Redirect to={"/Video"}></Redirect> : <label></label>}
      </div>
    </div>
  );
}

export default ADDModal;
