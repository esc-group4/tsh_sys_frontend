import React from "react";
import logo from "./assets/logo.svg";
import ExampleComp from "./components/exampleComponent/ExampleComp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";

function App() {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
    <p>test</p>
    </div>
  );
}

export default App;
