import React, { lazy } from "react";
import Dashboard from "./Container/Private/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./Routes/PrivateRoute";
import Theme from "./Container/Theme";
import Contact from "./Container/Contact";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Theme />} exact />
          <Route
            path="/dashboard"
            element={<PrivateRoute component={<Dashboard />} />}
            exact
          />
          <Route path="/contactUs" element={<Contact />} exact />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
