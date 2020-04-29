import React, { Component } from 'react'
import './App.css';
import { Route, Switch } from 'react-router-dom'
import SignInSide from './components/SignIn.js'
import SignUp from './components/SignUp.js'
import ItineraryView from './containers/ItineraryView';
import DiscoverView from './containers/DiscoverView';
import ItineraryCreate from './components/ItineraryCreate'
import NavigBar from './components/NavigBar'

export default class App extends Component {

  state={
    currentUser: { username: "", id: null },
    activities: [],
    itineraries: []
  }

  // componentDidMount() {
  //   const token = localStorage.token

  //   if (token) {
  //     //get user info if token is present 
  //     fetch("http://localhost:3000/auto_login", {
  //       headers: {
  //         "Authorization": token
  //       }
  //     })
  //       .then(res => res.json())
  //       .then(response => {
  //         if (response.errors) {
  //           alert(response.errors)
  //         } else {
  //           this.setState({
  //             currentUser: response
  //           })
  //         }
  //       })
  //     //load pantry data by user
  //     fetch(`http://127.0.0.1:3000/user`, {
  //       headers: {
  //         "Authorization": localStorage.token
  //       }
  //     })
  //       .then(resp => resp.json())
  //       .then(data => {
  //         this.setState({ pantry: data })
  //         fetch(`http://127.0.0.1:3000/recipe/search/${data.map(item => item.food_name).join(",")}`)
  //         .then(resp => resp.json())
  //         .then(data => this.setState({ filteredRecipes: data }))
  //       }
  //     )
  //   }
  // }

  // setUser = (response) => {
  //   this.setState({
  //     currentUser: response.user
  //   }, () => {
  //     localStorage.token = response.token
  //     this.props.history.push("/home")
  //   })

  // }


  render(){
    

    return (
      <div>
      <NavigBar />
        <div>
          <Switch>
              <Route exact path="/" render={() => <ItineraryView />} />
              <Route path="/login" render={() => <SignInSide />} />
              <Route path="/signup" render={() => <SignUp />} />
              <Route path="/discover" render={() => <DiscoverView />} />
              <Route path="/createtrip" render={() => <ItineraryCreate />} />
          </Switch>
        </div>
      </div>
    );
  }
}
