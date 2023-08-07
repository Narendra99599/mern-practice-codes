import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SignUp from "./SignUp";
import ForgetPassword from "./pages/ForgetPassword";
import VerifyEmail from "./pages/VerifyEmail";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="login" element={<Login></Login>}></Route>
        <Route path="signup" element={<SignUp />}></Route>
        <Route path="forget-password" element= {<ForgetPassword></ForgetPassword>}></Route>
        <Route path="verify-email" element = {<VerifyEmail/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
