import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import ItinerarySnippet from '../components/ItinerarySnippet'
import ItineraryDetails from '../components/ItineraryDetails'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'

export default class ItineraryView extends Component {

    state={
        toggleArchive: false,
        toggleDetails: false,
        toggleEdit: false,
        currentItin: [],
        activitiesToDelete: [],
        name: "",
        description: "",
        start: "",
        end: ""
    }

    handleArchiveToggle =()=>{
        this.setState({
            toggleArchive: !this.state.toggleArchive,
            toggleDetails: false
        })
    }

    handleDetailsOn =(itinerary)=>{
        this.setState({
            toggleDetails: true,
            currentItin: itinerary,
            name: itinerary.name,
            description: itinerary.description,
            start: itinerary.start,
            end: itinerary.end
        })
    }

    handleDetailsOff =()=>{
        this.setState({
            toggleDetails: false
        })
    }

    handleEditOn =()=>{
        this.setState({
            toggleEdit: true,
            toggleDetails: false
        })
    }

    handleChange =(event)=> {
        this.setState({
          [event.target.name]: event.target.value
        })
    }

    addActivitiesToDelete =(id)=> {
        this.setState(prevState => ({ activitiesToDelete: [...prevState.activitiesToDelete, id] }))
    }

    handleSaveChanges =()=>{

        fetch(`http://localhost:3000/itinerary/${this.state.currentItin.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'},
          body: JSON.stringify({
            itinerary: {
                user_id: this.props.user_id,
                name: this.state.name, 
                description: this.state.description,
                start: this.state.start,
                end: this.state.end
            }
          })
        })
        .then(this.state.activitiesToDelete.forEach(id => this.props.handleActivityDestroy(id)))
        .then(this.setState( {toggleEdit: false}))
        .then(this.props.fetchInfo)
    }

    
    handleShowArchived=()=>{
        if (this.props.itineraries !== 0 && this.state.toggleArchive === false){
            let notArchived = this.props.itineraries.filter(itin => itin.archived === false)  
            
            return notArchived.map((itinerary, index) =>
                { 
                return <ItinerarySnippet key={index} itinerary={itinerary} handleDetailsOn={this.handleDetailsOn} />
                })
        }else if(this.props.itineraries !== 0 && this.state.toggleArchive === true){
            let archived = this.props.itineraries.filter(itin => itin.archived === true)  
            
            return archived.map((itinerary, index) =>
                { 
                return <ItinerarySnippet key={index} itinerary={itinerary} handleDetailsOn={this.handleDetailsOn} />
                })
        }else{
            return <div>YOU GOT NOTHING</div>
        }
    }

    archiveItinerary=(id)=>{
        fetch(`http://localhost:3000/itinerary/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'},
          body: JSON.stringify({
            itinerary: {
                archived: true
            }
          })
        })
        .then(this.props.fetchInfo)
        .then(this.setState( {toggleDetails: false}))
    }

    render(){

        const view = (
            <Container fluid>
                
                <Form onChange={this.handleArchiveToggle}>  
                    <Form.Check 
                        type="switch"
                        id="custom-switch"
                        label="Check for Past Itineraries"
                        value="0"
                    />
                </Form>
                
                <Row>
                    <Col>
                    { this.handleShowArchived() }
                    </Col>

                    <Col>
                    {this.state.toggleDetails === true ? <ItineraryDetails archiveItinerary={this.archiveItinerary} handleEditOn={this.handleEditOn} handleItineraryDestroy={this.props.handleItineraryDestroy} handleDetailsOff={this.handleDetailsOff} activities={this.props.activities} currentItin={this.state.currentItin} archiveState={this.state.toggleArchive} /> : null}
                    </Col>
                </Row>
            </Container>
        );

        const edit = (
            <Container>


                <Form>
                    <Form.Group>
                        <Form.Label>Name:</Form.Label>
                        <Form.Control name="name" type="text" placeholder={this.state.currentItin.name} onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Description:</Form.Label>
                        <Form.Control name="description" type="text" placeholder={this.state.currentItin.description} onChange={this.handleChange}/>
                    </Form.Group>

                    <Row>
                        <Col>
                            <Form.Label>Start Date:</Form.Label>
                            <Form.Control name="start" placeholder={this.state.currentItin.start} onChange={this.handleChange}/>
                        </Col>
                        <Col>
                            <Form.Label>End Date:</Form.Label>
                            <Form.Control name="end" placeholder={this.state.currentItin.end} onChange={this.handleChange}/>
                        </Col>
                    </Row>

                    <ListGroup>
                    {this.props.activities.filter(activity => activity.itinerary_id === this.state.currentItin.id && !(this.state.activitiesToDelete.includes(activity.id))).map( (activity, index) => {
                        return <ListGroup.Item key={index} >
                                    {activity.name}<br />
                                    {activity.address}<br />
                                    {activity.rating}<br />
                                    <Button variant="primary" onClick={() => this.addActivitiesToDelete(activity.id)}>Delete Activity</Button>
                                </ListGroup.Item>
                        
                    })}

                    </ListGroup>  
                
                    <Button variant="primary" type="button" onClick={() => this.handleSaveChanges()}>
                    Save Changes
                    </Button>
                </Form>
            </Container>
        );


        console.log(this.state)
        return(
            <div>
                { this.state.toggleEdit ? edit : view }
            </div>
            // <Container fluid>
            //     <Form>  
            //         <Form.Check 
            //             type="switch"
            //             id="custom-switch"
            //             label="Check for Past Itineraries"
            //         />
            //     </Form>
                
            //     <Row>
            //         <Col>
            //         {this.props.itineraries.length != 0 ?
                    
            //             this.props.itineraries.map((itinerary, index) => 
            //                 { 
            //                 return <ItinerarySnippet key={index} itinerary={itinerary} handleDetailsToggle={this.handleDetailsToggle}/>
            //                 })
            //             :
            //             <div>YOU GOT NOTHING</div>

            //         }
            //         </Col>

            //         <Col>
            //         {this.state.toggleDetails == true ? <ItineraryDetails handleItineraryDestroy={this.props.handleItineraryDestroy} activities={this.props.activities} currentItin={this.state.currentItin} /> : null}
            //         </Col>
            //     </Row>
            // </Container>      
        )
    }
}