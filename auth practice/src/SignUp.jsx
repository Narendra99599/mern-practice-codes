import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSignupData } from "./redux/slices/authSlice";
import { sendOtp, signup } from "./services/operations/auth";
import { useNavigate } from "react-router-dom";
const obj = [
  {
    id: "1",
    data: "Student",
  },
  {
    id: "2",
    data: "Instructor",
  },
];

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const [formData, handleFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [role, setRole] = useState("Student");

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
    let data = { ...formData, role };
    dispatch(setSignupData(data));
    dispatch(sendOtp(data.email, navigate));
  }

  return (
    <div>
      {loading ? (
        <div className="spinner">
            <h1>loading</h1>
        </div>
      ) : (
        <div className="form-container">
          <div>
            {obj.map((e) => (
              <button
                className={`${role === e.data && "current-tab"} nav-btn`}
                key={e.id}
                onClick={(e) => setRole(e.target.textContent)}
              >
                {e.data}
              </button>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-element">
              <label htmlFor="firstName">firstName</label>
              <br></br>
              <input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                type="text"
                placeholder="firstName"
                onChange={handleChange}
              ></input>
            </div>

            <div className="form-element">
              <label htmlFor="lastName">last name</label>
              <br></br>
              <input
                id="lastName"
                type="text"
                placeholder="lastname"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              ></input>
            </div>

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
              <label htmlFor="password">password</label>
              <br></br>
              <input
                id="password"
                type="password"
                placeholder="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              ></input>
            </div>

            <div className="form-element">
              <label htmlFor="password">confirm password</label>
              <br></br>
              <input
                id="password"
                type="password"
                placeholder="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              ></input>
            </div>

            <button className="nav-btn">login</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignUp;
