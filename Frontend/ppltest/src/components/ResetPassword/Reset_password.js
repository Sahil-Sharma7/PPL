import axios from "axios";
import React, { useEffect, useState } from "react";
import externals from "../../config";
function Reset_password(props) {
  const base_URL = externals.serverUrl;
  console.log(props.match.params.token);
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [data, setData] = useState("");

  const Sumit_form = (event) => {
    event.preventDefault();
    console.log(pass1);
    console.log(pass2);
    console.log(event);
    if (pass1 != pass2) {
      setData("Passwords dont match");
    } else {
      axios
        .post(`${base_URL}/resetPassword`, {
          password: pass1,
          token: props.match.params.token,
        })
        .then((response) => {
          setData(response.data);
        });
    }
  };
  return (
    <div>
      <div className="content">
        <div className="content_rgt">
          <div className="register_sec">
            <h1>Reset Password</h1>
            <ul>
              <form onSubmit={Sumit_form}>
                <li>
                  <span>Enter New Password</span>
                  <input
                    type="text"
                    onChange={(e) => {
                      setPass1(e.target.value);
                    }}
                    value={pass1}
                    placeholder="Enter your new password"
                    required
                  />
                </li>
                <li>
                  <span>Confirm Password</span>
                  <input
                    type="text"
                    onChange={(e) => {
                      setPass2(e.target.value);
                    }}
                    value={pass2}
                    placeholder="Enter your password again"
                    required
                  />
                </li>
                <li>
                  <input type="submit" />
                </li>
                <li>
                  <h3>{data}</h3>
                </li>
              </form>
            </ul>
          </div>
        </div>
        <div className="content_lft">
          <h1>Welcome from PPL!</h1>
          <p className="discrptn">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable. If you are going to use a passage of Lorem Ipsum, you
            need to be sure there isn't anything embarrassing hidden in the
            middle of text.{" "}
          </p>
          <img src="/images/img_9.png" alt="" />{" "}
        </div>
      </div>
      <div className="clear" />
    </div>
  );
}
export default Reset_password;
