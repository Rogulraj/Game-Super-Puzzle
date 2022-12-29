import { Route, Router, BrowserRouter } from "react-router-dom";

import "./App.css";

import Signup from "./components/signup";
import Login from "./components/Login";
import Home from "./components/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Router>
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Home />} />
      </Router>
    </BrowserRouter>
  );
};

export default App;
