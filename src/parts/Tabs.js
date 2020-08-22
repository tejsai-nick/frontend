import React, { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import ADDModal from "./ADDModal";
import Thumbs from "./Thumbs";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
const Tabs = props => {
  var [activeTab, setActiveTab] = useState(true);

  return (
    <Router>
      {activeTab ? (
        <div style={{ width: 1200 }}>
          <div style={{ width: "100%" }}>
            <div
              style={{
                width: "33%",
                paddingRight: "5%",

                float: "left",
                textAlign: "right"
              }}
            >
              <Link to="/Video">Videos</Link>
            </div>
            <div
              style={{
                width: "33%",
                paddingLeft: "5%",
                float: "left",
                textAlign: "left"
              }}
            >
              <Link to="/AddVideo">AddVideo</Link>
            </div>
            <div
              style={{
                width: "33%",
                paddingLeft: "5%",
                float: "left",
                textAlign: "left"
              }}
            >
              <Link
                to="/logout"
                onClick={() => {
                  setActiveTab(false);
                  localStorage.removeItem("auth-token");
                }}
              >
                Logout
              </Link>
            </div>
          </div>
          <div>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/Video" component={Thumbs} />
              <Route path="/AddVideo" component={ADDModal} />
            </Switch>
          </div>
        </div>
      ) : (
        <div>
          <Redirect to="/Logout"></Redirect>
          <div>
            <h1>YOU HAVE SUCCESSFULLY LOGGED OUT</h1>
          </div>
        </div>
      )}
    </Router>
  );
};
const Home = () => {
  return (
    <div>
      <h1>Welcome</h1>
    </div>
  );
};

export default Tabs;
