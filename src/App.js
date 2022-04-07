import "./App.css";
import User from "./Component/user";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Student from "./Component/Student";

function App() {
  return (
    <div className="App container">
      <Router>
        <Switch>
          <Route exact path="/">
            <User />
          </Route>
          <Route path="/student-details">
            <Student />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
