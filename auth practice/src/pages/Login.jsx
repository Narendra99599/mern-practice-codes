import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/operations/auth";

const Login = () => {
  const [formData, handleFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(e) {
    handleFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(login(formData,navigate)); 
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-element">
          <label htmlFor="email">email addresss</label>
          <br></br>
          <input
            id="email"
            name="email"
            value={formData.email}
            type="text"
            placeholder="enter the mail"
            onChange={handleChange}
          ></input>
        </div>

        <div className="form-element">
          <label htmlFor="password">enter the password</label>
          <br></br>
          <input
            id="password"
            type="password"
            placeholder="enter the password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          ></input>
        </div>
        <button className="nav-btn">login</button>
        <Link to={"/forget-password"}>
          <button className="nav-btn">forget password</button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
