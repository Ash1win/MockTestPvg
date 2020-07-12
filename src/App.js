import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
  Redirect,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./components/loginPage";
import RegisterPage from "./components/RegisterPage";
import StaffLandingPage from "./components/staff/LandingPage";
import StudentLandingPage from "./components/student/LandingPage";

function App() {
  const [login, setLogin] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
          <ProtectedRoute path="/staff">
            <StaffLandingPage />
          </ProtectedRoute>
          <ProtectedRoute path="/student">
            <StudentLandingPage />
          </ProtectedRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
