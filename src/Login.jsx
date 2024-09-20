import React from 'react';

const Login = () => {

  const handleLogin = () => {
    console.log('Login')
    localStorage.setItem("isUserLoggedIn", "true");
    window.location.href = "http://localhost:3000/";
  }
  return (
    <div>
      <h1>Login</h1>

      <form>
        <input type="text" id="email" placeholder='Email' />
        <input type="text" id="password" placeholder='Password' />
        <button id="login" onClick={handleLogin}>Login</button>
      </form>
    </div>
  )
}

export default Login