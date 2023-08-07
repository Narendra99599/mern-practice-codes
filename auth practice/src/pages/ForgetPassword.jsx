import React from "react";

const ForgetPassword = () => {
  const [formData, handleFormData] = React.useState({
    password: "",
    confirmPassword: "",
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
    console.log(formData);
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
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
        <button className="nav-btn">submit</button>
      </form>
    </div>
  );
};

export default ForgetPassword;
