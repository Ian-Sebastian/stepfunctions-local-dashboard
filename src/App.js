import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateActivity from "./components/CreateActivity";
import CreateStateMachine from "./components/CreateStateMachine";
import DescribeActivity from "./components/DescribeActivity";
import DescribeExecution from "./components/DescribeExecution";
import GetActivityTask from "./components/GetActivityTask";
import ListActivities from "./components/ListActivities";
import ListExecutions from "./components/ListExecutions";
import ListStateMachines from "./components/ListStateMachines";
import StartExecution from "./components/StartExecution";
import SendTaskSuccess from "./components/SendTaskSuccess";
import SendTaskFailure from "./components/SendTaskFailure";
import SendTaskHeartbeat from "./components/SendTaskHeartbeat";

const APIs = [
  "createActivity",
  "createStateMachine",
  // "deleteActivity",
  // "deleteStateMachine",
  "describeActivity",
  "describeExecution",
  "describeStateMachine",
  "getActivityTask",
  "getExecutionHistory",
  "listActivities",
  "listExecutions",
  "listStateMachines",
  "listTagsForResource",
  "sendTaskFailure",
  "sendTaskHeartbeat",
  "sendTaskSuccess",
  "startExecution",
  // "stopExecution",
  "tagResource",
  "untagResource",
  "updateState"
];

function App() {
  return (
    <div className="App">
      <Router>
        <div class="sidenav">
          {APIs.map(api => {
            return (
              <Link className="nav-link active" to={"/" + api}>
                {api}
              </Link>
            );
          })}
        </div>

        <div class="main">
          <Route exact path="/createActivity" component={CreateActivity} />
          <Route
            exact
            path="/createStateMachine"
            component={CreateStateMachine}
          />
          <Route exact path="/describeActivity" component={DescribeActivity} />
          <Route
            exact
            path="/describeExecution"
            component={DescribeExecution}
          />
          <Route exact path="/getActivityTask" component={GetActivityTask} />
          <Route exact path="/listActivities" component={ListActivities} />
          <Route exact path="/listExecutions" component={ListExecutions} />
          <Route
            exact
            path="/listStateMachines"
            component={ListStateMachines}
          />
          <Route exact path="/startExecution" component={StartExecution} />
          <Route exact path="/sendTaskSuccess" component={SendTaskSuccess} />
          <Route exact path="/sendTaskFailure" component={SendTaskFailure} />
          <Route
            exact
            path="/sendTaskHeartbeat"
            component={SendTaskHeartbeat}
          />
        </div>
      </Router>
    </div>
  );
}

export default App;
