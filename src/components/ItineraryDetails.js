import React from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'


export default function ItineraryDetails(props) {

    
    return(
        <Card>
            <Card.Body>
                <Card.Title>{props.currentItin.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{props.currentItin.description}</Card.Subtitle>
            </Card.Body>
            <ListGroup>
                {props.activities.filter(activity => activity.itinerary_id === props.currentItin.id).map( (activity, index) => {
                    return <ListGroup.Item key={index} >
                                {activity.name}<br />
                                {activity.address}<br />
                                {activity.rating}
                            </ListGroup.Item>
                    
                })}

            </ListGroup>
            <Button variant="primary">Archive</Button>
            <Button variant="primary" onClick={() => props.handleEditOn() }>Edit</Button>
            <Button variant="primary" onClick={() => { props.handleItineraryDestroy(props.currentItin.id); props.handleDetailsOff() }}>Delete</Button>
            {/* href="/itineraries" */}
        </Card>
    )
}