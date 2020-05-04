import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'


export default class Landing extends Component {

    render (){
        return(
           
                
            <Container>
                <Row>
                    Horizons - Travel Planning for Those Who Only Want To Look Forward
                    <Col><Button href="/signin">Sign In</Button></Col>
                    <Col><Button href="/signup">Sign Up</Button></Col>
                </Row>
            </Container>      
        )
    }
}