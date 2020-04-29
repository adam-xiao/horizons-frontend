import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

export default class NavigBar extends Component {

    render(){

        return(
            <Navbar bg="light" expand="lg">
                <Navbar.Brand >Horizons</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/">My Itineraries</Nav.Link>
                        <Nav.Link href="/createtrip">Create Trip</Nav.Link>
                        <Nav.Link href="/discover">Discover</Nav.Link>
                    </Nav>
            </Navbar>
        )
    }
}