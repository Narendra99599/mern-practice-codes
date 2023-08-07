import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../services/operations/auth";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const {signUpdata} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, handleFormData] = React.useState({
    otp: "",
  });

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
    let data = {...signUpdata, ...formData};
    console.log(data);
    dispatch(signup(data,navigate));
  }
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-element">
          <label htmlFor="otp">enter the otp</label>
          <br></br>
          <input
            id="otp"
            name="otp"
            value={formData.otp}
            type="text"
            placeholder="enter the otp"
            onChange={handleChange}
          ></input>
        </div>
        <button className="nav-btn">verify</button>
      </form>
    </div>
  );
};

export default VerifyEmail;
