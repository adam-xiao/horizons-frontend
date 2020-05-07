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
                <Card.Text>
                Start: {props.currentItin.start}        End: {props.currentItin.end}
                </Card.Text>
            </Card.Body>
            <ListGroup>
                {props.activities.filter(activity => activity.itinerary_id === props.currentItin.id).map( (activity, index) => {
                    return <ListGroup.Item key={index} >
                                {activity.name}<br />
                                {activity.address}<br />
                                Rating: {activity.rating}
                            </ListGroup.Item>
                    
                })}
            
            </ListGroup>
            { props.archiveState === false ? 
                <>
                <Button variant="primary" onClick={() => props.archiveItinerary(props.currentItin.id) }>Archive</Button>
                <Button variant="primary" onClick={() => props.handleEditOn() }>Edit</Button> 
                </>
                :
                null
            }
            <Button variant="primary" onClick={() => { props.handleItineraryDestroy(props.currentItin.id); props.handleDetailsOff() }}>Delete</Button>
        </Card>
    )
}