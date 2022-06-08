import React from 'react';
import './Login.scss'
import './components/Background/Background.module.css';
import Background from './components/Background/Background';
import FormWrap from './components/FormWrap/FormWrap';
import Logo from './components/Logo/Logo';

function Login() {
  return (

    <div className="container">
      <Background />
      <div className='login-wrap'>
        <Logo />
        <FormWrap />
      </div>
    </div>
  );
}

export default Login;


