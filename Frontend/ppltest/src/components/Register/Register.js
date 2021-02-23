import React, { PureComponent } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Welcome from '../Welcome/Welcome';
import {Link} from 'react-router-dom';
import externals from '../../config'

function Register(){
  const base_URL = externals.serverUrl;
  const [Fname,setFname] = useState('')
  const [Lastname,setLastname] = useState('')
  const [Email,setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [Username, setUsername] = useState('')
  const [RecievedData,setRecievedData] = useState({})
  let Rsubmit = (event) => {
    event.preventDefault()
    console.log('Email here is ',Email)
    let Data ={
      username : Username,
      first_name : Fname,
      last_name : Lastname,
      email :Email,
      password : Password
    }
    console.log('The data here is',Data)
    axios.post(`${base_URL}/Register`,Data).then((response) => {
      
      setRecievedData(response);
      
      
      // setRecievedData(response)
    })
    setEmail('');
      setFname('');
      setLastname('');
      setPassword('');
      setUsername('');
    

    // console.log('recieved data is ',RecievedData.data)

  }



    return(
        <div>
        {/* <div className="container">
          <div className="content"> */}
          <Welcome />
            <div className="content_rgt">
              <div className="register_sec">
                <h1>Create An Account</h1>
                <form onSubmit = {Rsubmit}>
                  <ul>
                      <li><span>Username</span><input type="text" name="username" value={Username}
                       onChange = {(e) => {setUsername(e.target.value)}} placeholder="Enter your username" required /></li>
                      <li><span>Password</span><input type="text" name="password" value={Password} 
                      onChange = {(e) => {setPassword(e.target.value)}} placeholder="Enter your password" required /></li>
                      <li><span>Email</span><input type="text" name="email" value={Email}
                      onChange = {(e) => {setEmail(e.target.value)}} placeholder="Enter your email" required /></li>
                      <li><span>First Name</span><input type="text" name="first_name" value={Fname}
                        onChange = {(e) => {setFname(e.target.value)}}  placeholder="Enter your first name" required /></li>
                      <li><span>Last Name</span><input type="text" name="last_name" value={Lastname}
                       onChange = {(e) => {setLastname(e.target.value)}} placeholder="Enter your last name" required /></li>
                      <li><input type="checkbox" />I agree to Term &amp; Conditions</li>
                      <li><h4>{RecievedData.data}</h4></li>
                      <li><input type="submit" defaultValue="Register" required /></li>
                  </ul>
                </form>
                <div className="addtnal_acnt"><Link to='/Login'>
                <li >I already have an account.</li>
              </Link></div>
              </div>
            </div>

          {/* </div>
        </div> */}
        <div className="clear" />

        </div>
    )

};
export default Register;