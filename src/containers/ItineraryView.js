import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

export default class ItineraryView extends Component {

    render (){
        return(
           
           
                        


            <Container>
                <Form>  
                    <Form.Check 
                        type="switch"
                        id="custom-switch"
                        label="Check for Past Itineraries"   
                    />
                </Form>
                
                <Row>
                    <Col>1 of 2</Col>
                    <Col>2 of 2</Col>
                </Row>
            </Container>      
        )
    }
}