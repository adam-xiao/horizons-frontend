import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


export default class ItineraryCreate extends Component {

    state={
        name: "",
        description: "",
        start: "",
        end: ""
    }
    
    handleSubmit = (e) => {
        e.preventDefault()

        console.log(this.state)
    
        fetch("http://localhost:3000/itinerary", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            itinerary: {
                //user_id
                name: this.state.name, 
                description: this.state.description,
                start: this.state.start,
                end: this.state.end
            }
          })
        })
        .then(res => res.json())
        .then(resp => console.log(resp))
      }

      handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        })
      }

    render (){
        
        return( 
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Control name="name" type="text" placeholder="Name" onChange={this.handleChange}/>
                </Form.Group>

                <Form.Group>
                    <Form.Control name="description" type="text" placeholder="Description" onChange={this.handleChange}/>
                </Form.Group>

                <Row>
                    <Col>
                        <Form.Control name="start" placeholder="Start Date" onChange={this.handleChange}/>
                    </Col>
                    <Col>
                        <Form.Control name="end" placeholder="End Date" onChange={this.handleChange}/>
                    </Col>
                </Row>  
            
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>

        )
    }
}