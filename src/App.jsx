import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import Login from "./components/login/login";

function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={Login} exact />
      </Switch>
    </>
  );
}

export default App;
