import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Link,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import CreateStudent from "./CreateStudent";
import CreateTest from "./CreateTest";
import ViewTest from "./ViewTest";
import TestDetailView from "./TestDetailView";
import StudentAnalytics from "./StudentAnalytics";
import StudentAnalyticDetails from "./StudentAnalyticDetails";
import "./LandingPage.css";

function LandingPage() {
  const history = useHistory();
  const handleLogout = () => {
    localStorage.clear();
    history.push("/login");
  };
  const { path, url } = useRouteMatch();
  return (
    <div className="main-container">
      <Router>
        <nav className="nav">
          <Link className="nav-items" to={`${url}/createTest`}>
            Create Test
          </Link>
          <Link className="nav-items" to={`${url}/viewTest`}>
            View Test
          </Link>
          <Link className="nav-items" to={`${url}/createStudent`}>
            Create Student
          </Link>
          <Link className="nav-items" to={`${url}/studentAnalytics`}>
            Student AnaLytics
          </Link>
          <button className="nav-items" onClick={handleLogout}>
            Logout
          </button>
        </nav>
        <div className="sub-container">
          <Switch>
            <ProtectedRoute path={`${path}/createTest`}>
              <CreateTest />
            </ProtectedRoute>
            <ProtectedRoute path={`${path}/viewTest`}>
              <ViewTest />
            </ProtectedRoute>
            <ProtectedRoute path={`${path}/createStudent`}>
              <CreateStudent />
            </ProtectedRoute>
            <ProtectedRoute path={`${path}/studentAnalytics`}>
              <StudentAnalytics />
            </ProtectedRoute>
            <ProtectedRoute path={`${path}/studentDetail/:name/:id`}>
              <StudentAnalyticDetails />
            </ProtectedRoute>
            <ProtectedRoute path={`${path}/:testId`}>
              <TestDetailView />
            </ProtectedRoute>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default LandingPage;
