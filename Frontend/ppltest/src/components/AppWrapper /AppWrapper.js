import React, { PureComponent } from "react";
import { Redirect, Route } from "react-router-dom";
import App from "../../App";
import Timeline from "../Timeline/Timeline";
import Single_Post from '../Single_Post/Single_post'

function AppWrapper() {
  let email = localStorage.getItem("email");
  console.log("email in localStorage is", email);
  if (email === null) {
    return <Redirect to="/Login"></Redirect>;
  }
  return (
    <div>
      <Route path="/Timeline" exact component={Timeline}></Route>
      <Route path="/Timeline/:Number" component={Single_Post} />
    </div>
  );
}
export default AppWrapper;
