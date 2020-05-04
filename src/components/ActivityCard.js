import React, { useState } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import Image from 'react-bootstrap/Image'


export default function ActivityCard(props) {

  const [targetItin, setTargetItin] = useState(0)


  function handleSubmit(e){
    e.preventDefault()

    fetch("http://localhost:3000/activity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        activity: {
          itinerary_id: targetItin, 
          name: props.placeDetail.result.name,
          address: props.placeDetail.result.formatted_address,
          rating: props.placeDetail.result.rating
        }
      })
    })
    .then(res => res.json())
    .then(response => {
      if (response.errors) {
        alert(response.errors)
      } else {
        alert("Successfully Added!")
      }
    })
  }


  // function fetchImage(){
  //   fetch(`http://localhost:3000/photos/${props.placeDetail.result.photos[0].photo_reference}`)
  //           .then(resp => resp.json())
  //           .then(data => setPlacePhoto(data),
  //           console.log(placePhoto)
  //           )
  // }

  let randomIndex = Math.floor(Math.random() * 100)
    
    return(
    
        <Card>
            <Card.Body>
                <Card.Title>{props.placeDetail.result.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{props.placeDetail.result.formatted_address}</Card.Subtitle>
                <Card.Text>
                Rating: {props.placeDetail.result.rating}
                </Card.Text>
                <Image fluid src={`https://source.unsplash.com/random/200x200/?${props.placeDetail.result.name}/?sig=${randomIndex}`} />
            <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    Select Itinerary
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {
                        props.itineraries.map((itinerary, index) => <Dropdown.Item key={index} onClick={() => setTargetItin(itinerary.id)}>{itinerary.name}</Dropdown.Item>)
                    }
                    {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
                </Dropdown.Menu>
                </Dropdown>
            <Button onClick={handleSubmit}>Add to Itinerary</Button>
            </Card.Body>
        </Card>
    )
}