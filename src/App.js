import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import SearchPage from './components/SearchPage';
import ShowFoundCar from './components/ShowFoundCar';
import ShowSpecificData from './components/ShowSpecificData';

import './App.css';

const App = () => {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={SearchPage}/>
          <Route exact path="/variables" component={ShowFoundCar}/>
          <Route path="/variables/:variable" component={ShowSpecificData}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
