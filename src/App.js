import './App.css';
import FindingFalcone from './pages/findingFalcone';
import { Route, Switch } from "react-router-dom";
import Result from './pages/result';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <FindingFalcone />
        </Route>
        <Route exact path="/result">
          <Result />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
