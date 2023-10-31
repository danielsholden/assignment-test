import React from "react";
import ReactDOM from "react-dom";
import { mock } from "./__mock__";
import { App } from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App timetable={mock} />
  </React.StrictMode>,
  document.getElementById("root")
);
