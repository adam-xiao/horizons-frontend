import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'


export default class Landing extends Component {

    render (){
        return(
           <>
            { localStorage.token ? this.props.history.push("/itineraries") :

            
            <Container className="parentTest">
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Row>
                    <h1 className="test">Horizons</h1><br/>
                </Row>
                <Row>
                    <h1 className="test2">For The Forward Traveler</h1>
                </Row>
                    
                
                <br></br>
                <Row>
                    <Col>
                    <Button href="/signin">Sign In</Button><pre>        </pre><Button href="/signup">Sign Up</Button>
                    </Col>
                    {/* <Col>
                    
                    </Col> */}
                {/* <Button href="/signin">Sign In</Button><pre>               </pre><Button href="/signup">Sign Up</Button> */}
                </Row>
            </Container>      
            }
            </>       
        )
    }
}