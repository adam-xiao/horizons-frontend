import React, { Component } from 'react'
import './App.css';
import { Route, Switch } from 'react-router-dom'
import SignInSide from './components/SignIn.js'
import SignUp from './components/SignUp.js'
import ItineraryView from './containers/ItineraryView';
import DiscoverView from './containers/DiscoverView';
import ItineraryCreate from './components/ItineraryCreate'
import NavigBar from './components/NavigBar'
import Landing from './containers/Landing'

export default class App extends Component {

  state={
    currentUser: { username: "", id: null },
    activities: [],
    itineraries: []
  }

  componentDidMount() {
    const token = localStorage.token

    if (token) {
      //get user info if token is present 
      fetch("http://localhost:3000/auto_login", {
        headers: {
          "Authorization": token
        }
      })
        .then(res => res.json())
        .then(response => {
          if (response.errors) {
            alert(response.errors)
          } else {
            this.setState({
              currentUser: response
            })
          }
        })
      // load user's itineraries
      fetch(`http://localhost:3000/retrieveitin`, {
        headers: {
          "Authorization": localStorage.token
        }
      })
        .then(resp => resp.json())
        .then(data => { 
          this.setState({ itineraries: data })
          console.log(data)
        }
      )
    }
  }

  setUser = (response) => {
    this.setState({
      currentUser: response.user
    }, () => {
      localStorage.token = response.token
      this.props.history.push("/itineraries")
    })

  }

  logout = (e) => {
    e.preventDefault()
    this.setState({
      currentUser: { username: "", id: null }
    }, () => {
      localStorage.removeItem("token")
      this.props.history.push("/signin")
    })
  }


  render(){
    
    return (
      <div>
      <NavigBar logout={this.logout} username={this.state.currentUser.username}/>
        <div>
          <Switch>
              <Route exact path="/" render={() => <Landing />} />
              <Route path="/itineraries" render={() => <ItineraryView itineraries={this.state.itineraries} />} />
              <Route path="/signin" render={() => <SignInSide setUser={this.setUser} history={this.props.history}/>} />
              <Route path="/signup" render={() => <SignUp setUser={this.setUser} history={this.props.history}/>} />
              <Route path="/discover" render={() => <DiscoverView itineraries={this.state.itineraries} />} />
              <Route path="/createtrip" render={() => <ItineraryCreate user_id={this.state.currentUser.id}/>} />
          </Switch>
        </div>
      </div>
    );
  }
}
