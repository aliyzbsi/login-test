import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import Login from "./components/login/login";
import Success from "./components/success/Success";

function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/success" component={Success} />
      </Switch>
    </>
  );
}

export default App;
