import React from 'react'
import Card from 'react-bootstrap/Card'


export default function ActivityCard(props) {

    
    return(
        <Card>
            <Card.Body>
                <Card.Title>{props.placeDetail.result.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{props.placeDetail.result.formatted_address}</Card.Subtitle>
                <Card.Text>
                Rating: {props.placeDetail.result.rating}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}