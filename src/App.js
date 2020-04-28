import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import SignInSide from './components/SignIn.js'
import SignUp from './components/SignUp.js'
import ItineraryView from './containers/ItineraryView';
import DiscoverView from './containers/DiscoverView';


function App() {
  return (
    <div className="App">
      <Switch>
            <Route exact path="/" render={() => <ItineraryView />} />
            <Route path="/login" render={() => <SignInSide />} />
            <Route path="/signup" render={() => <SignUp />} />
            <Route path="/discover" render={() => <DiscoverView />} />
      </Switch>
    </div>
  );
}

export default App;
