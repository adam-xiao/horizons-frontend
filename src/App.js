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
      
      fetch(`http://localhost:3000/retrieveactivity`, {
        headers: {
          "Authorization": localStorage.token
        }
      })
        .then(resp => resp.json())
        .then(data => { 
          this.setState({ activities: data })
          console.log(data)
        }
      )

    }
  }


  fetchInfo =()=>{
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
      
      fetch(`http://localhost:3000/retrieveactivity`, {
        headers: {
          "Authorization": localStorage.token
        }
      })
        .then(resp => resp.json())
        .then(data => { 
          this.setState({ activities: data })
          console.log(data)
        }
      )

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

  handleItineraryDestroy = (id) => {
    fetch(`http://localhost:3000/itinerary/${id}`,
      { method: 'DELETE' }
    ).then(this.setState({ itineraries: this.state.itineraries.filter(itin => itin.id !== id) }))
  }

  handleActivityDestroy = (id) => {
    fetch(`http://localhost:3000/activity/${id}`,
      { method: 'DELETE' }
    ).then(this.setState({ activities: this.state.activities.filter(activity => activity.id !== id) }))
}

  render(){
    
    return (
      <div>
      <NavigBar logout={this.logout} username={this.state.currentUser.username}/>
        <div>
          <Switch>
              <Route exact path="/" render={() => <Landing />} />
              <Route path="/itineraries" render={() => <ItineraryView itineraries={this.state.itineraries} handleItineraryDestroy={this.handleItineraryDestroy} activities={this.state.activities} handleActivityDestroy={this.handleActivityDestroy} />} />
              <Route path="/signin" render={() => <SignInSide fetchInfo={this.fetchInfo} setUser={this.setUser} history={this.props.history}/>} />
              <Route path="/signup" render={() => <SignUp setUser={this.setUser} history={this.props.history}/>} />
              <Route path="/discover" render={() => <DiscoverView fetchInfo={this.fetchInfo} itineraries={this.state.itineraries} history={this.props.history}/>} />
              <Route path="/createtrip" render={() => <ItineraryCreate fetchInfo={this.fetchInfo} user_id={this.state.currentUser.id} history={this.props.history}/>} />
          </Switch>
        </div>
      </div>
    );
  }
}
