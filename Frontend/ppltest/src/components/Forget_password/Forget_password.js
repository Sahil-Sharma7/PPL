import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import externals from "../../config";

function Forget_password({ props }) {
  const base_URL = externals.serverUrl;
  const [Email, setEmail] = useState("");
  const [data, setData] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    if (Email === "") {
      console.log("Email Cant Be Empty");
    } else {
      axios
        .post(`${base_URL}/forgetPassword`, { Email: Email })
        .then((response) => {
          setData(response.data);
        });
    }
  };

  return (
    <div>
      <div className="login_sec">
        <h1>Forget Password</h1>
        <form onSubmit={sendEmail}>
          <ul>
            <li>
              <span>Email-ID</span>
              <input
                type="text"
                name="email"
                value={Email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Enter your email"
                required
              />
            </li>
            <li>
              <input type="submit" defaultValue="Log In" />
            </li>
            <li>
              <h3>{data}</h3>
            </li>
          </ul>
        </form>
        <div className="addtnal_acnt">
          <a onClick={props}>Back To Login</a>
        </div>
      </div>
    </div>
  );
}
export default Forget_password;
