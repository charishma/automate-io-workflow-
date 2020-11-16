import React, { useState } from 'react';
import {useDispatch,useSelector } from 'react-redux';
import { push as pushRoute } from "connected-react-router";
import {PageRoutes} from '../Constants/constants';
import loginStyle from './Login.css';

const LoginPane = ()=>{

  const [username, setUserName] = useState('');
  const [password, setUserPassword] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  // handle button click of login form
const handleLogin = (e) => {
    e.preventDefault();
    if(username && password)
    {
        setError(null);
        dispatch(pushRoute(PageRoutes.workflow));

    }else{
        setError('Please enter email and password');
    }
  }

return (
        <div className='col-md-6 mx-auto outerDiv' >
          <form  onSubmit={handleLogin} style={{float: 'left',margin: '2% 10%'}}>
            <h4 style={{textAlign:'center'}}>Login</h4>
            <div className='form-group row'>
              <input className='input' type='text' placeholder='Email' onChange={(e)=>setUserName(e.target.value)}/>
            </div>
            <div className='form-group row'>
              <input className='input' type='password' placeholder='Password' onChange={(e)=>setUserPassword(e.target.value)}/>
            </div>
            <div className='form-group row' style={{ font:'400 13.3333px Arial'}}>
              <input type="checkbox"  value="Remember me"/>
              <span>Remember me</span>
            </div>
            <div className='form-group row'>
              <button className='btn' type='submit'>Log In</button>
            </div>
            <div className='form-group row registerLink'>
              <span>Dont have an account?SignUp here</span>
            </div>
            {error && <div className='form-group row errorMsg'>
              <span>{error}</span>
            </div>}
          </form>
        </div>
      )
    
  }
  
 
export default LoginPane;