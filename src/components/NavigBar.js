import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'


export default class NavigBar extends Component {

    render(){

        return(
            <>
            {localStorage.token ? 
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand >Horizons</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/itineraries">My Itineraries</Nav.Link>
                        <Nav.Link href="/createtrip">Create Trip</Nav.Link>
                        <Nav.Link href="/discover">Discover</Nav.Link>
                        <pre>                                                                                               </pre><Navbar.Text>Hello, {this.props.username}</Navbar.Text><pre> </pre><Button type="submit" onClick={this.props.logout}>Sign out</Button>
                    </Nav>
                </Navbar>
                :
                null
            }
            </>
        )
    }
}