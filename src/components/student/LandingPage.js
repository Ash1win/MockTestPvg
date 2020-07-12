import React from "react";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import TestList from "./TestList";
import TestAttemptView from "./TestAttemptView";
import MyHistory from "./MyHistory";
import "./LandingPage.css";

function LandingPage() {
  const history = useHistory();
  const handleLogout = () => {
    localStorage.clear();
    history.push("/login");
  };

  return (
    <div>
      <div className="main-container">
        <div className="nav">
          <Link to="/student/tests">Tests</Link>

          <Link to="/student/myhistory">My History</Link>

          <button onClick={handleLogout}>Logout</button>
        </div>
        <div className="sub-container">
          <Switch>
            <Route path="/student/tests">
              <TestList />
            </Route>
            <Route path="/student/myhistory">
              <MyHistory />
            </Route>
            <Route path="/student/:testId">
              <TestAttemptView />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
