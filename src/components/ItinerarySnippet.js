import React from 'react'
import Card from 'react-bootstrap/Card'


export default function ItinerarySnippet(props) {

    
    return(
        <Card onClick={() => props.handleDetailsOn(props.itinerary)}>
            <Card.Body>
                <Card.Title>{props.itinerary.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{props.itinerary.description}</Card.Subtitle>
            </Card.Body>
        </Card>
    )
}