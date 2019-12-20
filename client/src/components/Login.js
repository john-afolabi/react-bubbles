import React, { useState } from "react";
import axios from "axios";

const Login = ({ history }) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: ""
  });

  const handleChange = event => {
    setLoginInfo({ ...loginInfo, [event.target.name]: event.target.value });
  };

  const onLogin = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", loginInfo)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        history.push("/bubbles");
      })
      .catch(err => {
        alert(err.message);
      });
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form>
        <input
          type="text"
          name="username"
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
        />
        <button onClick={onLogin}>Login</button>
      </form>
    </>
  );
};

export default Login;
