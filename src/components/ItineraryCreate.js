import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'


export default class ItineraryCreate extends Component {

    state={
        name: "",
        description: "",
        start: "",
        end: ""
    }
    
    handleSubmit = (e) => {
        e.preventDefault()

        // console.log(this.state)
    
        fetch("http://localhost:3000/itinerary", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            itinerary: {
                user_id: this.props.user_id,
                name: this.state.name, 
                description: this.state.description,
                start: this.state.start,
                end: this.state.end
            }
          })
        })
        .then(res => res.json())
        .then(resp => console.log(resp))
        .then(this.props.history.push("/itineraries")) //new Addition
        .then(this.props.fetchInfo)
      }

      handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        })
      }

    render (){
        // console.log(this.state)
        return(
          <Container className="allCenter">
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control name="name" type="text" placeholder="Name" onChange={this.handleChange}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Description:</Form.Label>
                    <Form.Control name="description" type="text" placeholder="Description" onChange={this.handleChange}/>
                </Form.Group>

                <Row>
                    <Col>
                        <Form.Label>Start Date:</Form.Label>
                        <Form.Control name="start" placeholder="YYYY-MM-DD" onChange={this.handleChange}/>
                    </Col>
                    <Col>
                        <Form.Label>End Date:</Form.Label>
                        <Form.Control name="end" placeholder="YYYY-MM-DD" onChange={this.handleChange}/>
                    </Col>
                </Row>  
            
            <Button className="hCenter" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container> 
        )
    }
}