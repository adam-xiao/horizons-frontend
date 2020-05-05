import React, { Component } from 'react'
import ActivityCard from '../components/ActivityCard'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

export default class DiscoverView extends Component {

    state={
        placeDetails: [],
        search: "",
        placeIds: [],
    }  

    handleOnChange = (e) => this.setState( {search: e.target.value})
  

    
    collectPlaceDetails =(id)=> {
        this.setState( {placeDetails: []} )

        fetch(`http://localhost:3000/activities/${id}`)
            .then(resp => resp.json())
            .then(data => {
                this.setState(prevState => ({ placeDetails: [...prevState.placeDetails, data] }))
                // console.log('collecting details for: ', id, 'and got:', data)
            })
    }


    handleOnSubmit = (e) => {
        e.preventDefault()
        fetch(`http://localhost:3000/discover/${this.state.search}`)
            .then(resp => resp.json())
            .then(data => {
                const idArray = data["predictions"].map( predictions => predictions.place_id) 
                this.setState( { placeIds: idArray } )
                // console.log(this.state.placeIds)
            })
            .then(() => {
                // console.log('inside of next then', this.state)
                this.state.placeIds.forEach(id => this.collectPlaceDetails(id))
            })
    }


    render (){
        console.log(this.state.placeDetails)
        
        return(
            <Container>

            <Form onSubmit={this.handleOnSubmit}>
                <Form.Group>
                    <Form.Label>Discover!</Form.Label>
                    <Form.Control type="search" placeholder="Discover Somewhere New!" onChange={this.handleOnChange} value={this.state.search} />
                </Form.Group>
                <Button variant="primary" type="submit">
                Submit
                </Button>
                {this.state.placeDetails.map((detail, index) => 
                    { 
                    return <ActivityCard key={index} placeDetail={detail} itineraries={this.props.itineraries}/>
                    // return <div>
                    //     <h1>{details.result.name}</h1>
                    //     <h2>{details.result.formatted_address}</h2>
                    //     <p>{details.result.rating}</p>
                    // </div>
                    }
                )}
            </Form>
            </Container>
        )
    }
}