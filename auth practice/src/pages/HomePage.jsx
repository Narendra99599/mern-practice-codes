import React from "react";
import './HomePage.css'

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="home-header">
        <button className="instructor-button nav-btn">Become an instructor</button>
        <h1 className="home-heading" >Empower Your Future with Coding Skills</h1>
        <p className="home-intro-text">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </p>
        <div className="home-button-container">
          <button className="home-button-one nav-btn">Learn more</button>
          <button className="home-button-two nav-btn">book a demo</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
