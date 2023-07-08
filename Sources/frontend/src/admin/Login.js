import { React, useEffect, useState } from "react";
import "./Login.css";
import userApi from "../api/userApi";

import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  function handleChangeUsername(e) {
    setUsername(e.target.value);
  }
  function handleChangePassword(e) {
    setPassword(e.target.value);
  }
  async function Login(user) {
    try {
      const response = await userApi.login(user);
      const userData = JSON.parse(JSON.stringify(response));
     
      localStorage.setItem('access_token', userData.token);
      navigate("/admin/category-product.html");
      window.location.reload()
    } catch (error) {
      alert("Đăng nhập không thành công");
    }
  }
  async function handleLogin() {
    const user = {
      username: username,
      password: password,
    };
    Login(user);
  }

  //handle inputtext
  return (
    <div className="form-login">
      <div className="background-img-login">
        <div className="container-login">
          <h2>ĐĂNG NHẬP</h2>
          <div className="form-group">
            <label>Tên đăng nhập</label>
            <input
              onChange={handleChangeUsername}
              type="email"
              className="form-control input-login"
              placeholder="username"
            />
          </div>
          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              onChange={handleChangePassword}
              type="password"
              className="form-control input-login "
              placeholder="password"
            />
          </div>

          <button className="btn btn-primary btn-login" onClick={handleLogin}>
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
