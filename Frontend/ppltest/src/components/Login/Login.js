import React, { PureComponent } from 'react'
import { useState,useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Welcome from '../Welcome/Welcome';
import externals from '../../config';
import Forget_password from '../Forget_password/Forget_password';

function Login() {
  const base_URL = externals.serverUrl;
  const [Email,setEmail] = useState('')
  const [Password , setPassword] = useState('')
  const [DataRecieved,setDataRecieved] = useState({})
  const [Visible,setVisible] = useState(true)
  
  const history = useHistory();
  console.log('this is for experinment',history)
  let  submit = (e) =>{
    e.preventDefault()
    console.log(Email)
    let Data ={
      email :Email,
      password : Password
    }
    
    axios.post(`${base_URL}/Login`,Data).then((response) => {
      console.log(response);
      setDataRecieved(response);
      if(response.data == 'Sucessfully Logged in'){
        console.log('this thing worked')
        
          localStorage.setItem('email',Email)
        
        history.push("/Timeline");
        console.log('THe history here is ',history)
      }
      
      
    })
    setEmail('')
    setPassword('')
  }
  let forget_clicked = () => {
    setVisible(!Visible)
  }
    return (
        <div>
             <Welcome />
              <div className="content_rgt">
                {Visible ?
                <div className="login_sec">
                <h1>Log In</h1>
                <form onSubmit = {submit}>
                <ul>
                  <li><span>Email-ID</span><input type="text" name="email" value={Email}
                    onChange = {(e) => {setEmail(e.target.value)}} placeholder="Enter your email" required  /></li>
                  <li><span>Password</span><input type="text" name="password" value={Password} 
                    onChange = {(e) => {setPassword(e.target.value)}} placeholder="Enter your password" required/></li>
                  <li><input type="checkbox" />Remember Me</li>
                  <h1>{DataRecieved.data}</h1>
                  <li><input type="submit"  defaultValue="Log In" /><a onClick={forget_clicked}>Forgot Password</a></li>
                </ul>
                </form>
                
                <div className="addtnal_acnt">
                  <Link to='/'>
                    <li >I do not have any account yet.</li>
                  </Link></div>  
                  </div>
                  : 
                  <Forget_password props={forget_clicked} />
              }
                
                
              </div>
            {/* </div>
          </div> */}
          <br/>
          <div className="clear" />

        </div>
      );
  
        
}

export default Login;
