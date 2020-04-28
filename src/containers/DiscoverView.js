import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default class DiscoverView extends Component {

    state={
        search: ""
    }
    
    handleOnChange = (e) => this.setState( {search: e.target.value})
    
    handleSearchBar = (term) => {
        fetch(`http://localhost:3000/discover/${term}`)
          .then(resp => resp.json())
          .then(data => console.log(data))
    }

    handleOnSubmit = (e) => {
        e.preventDefault()
        this.handleSearchBar(this.state.search)
    }

    render (){
        return(
            <Form onSubmit={this.handleOnSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Discover!</Form.Label>
                    <Form.Control type="search" placeholder="Discover Somewhere New!" onChange={this.handleOnChange} value={this.state.search} />
                </Form.Group>
                <Button variant="primary" type="submit">
                Submit
                </Button>
            </Form>
        )
    }
}