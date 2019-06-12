import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Form, Button } from 'semantic-ui-react';

// const emptyEvent = {
//     title: '',
//     date: '',
//     city: '',
//     venue: '',
//     hostedBy: ''
// }

const mapState = (state, ownProps) => {
    const eventId = ownProps.match.params.id;

    let event = {
        title: '',
        date: '',
        city: '',
        venue: '',
        hostedBy: ''
    }

    if (eventId && state.events.length > 0) {
        event = state.events.filter(event => event.id === eventId)[0];
    }

    return {
        event
    }

}


class EventForm extends Component {
    state = {
        event: Object.assign({}, this.props.event)
    }

    // componentDidMount() {
    //     if (this.props.selectedEvent !== null)
    //         this.setState({
    //             event: this.props.selectedEvent
    //         })
    // }

    // static getDerivedStateFromProps(props, state) {

    //     if (props.selectedEvent !== null) {
    //         if (props.selectedEvent !== state.event) {
    //             return {
    //                 event: props.selectedEvent
    //             }
    //         }
    //     }
    //     // // Return null if the state hasn't changed
    //     return null;
    // }



    onFormSubmit = (evt) => {
        evt.preventDefault();
        if (this.state.event.id) {
            this.props.updateEvent(this.state.event)
        } else {
            this.props.createEvent(this.state.event);
        }
    }
    onInputChange = (evt) => {
        const newEvent = this.state.event;
        newEvent[evt.target.name] = evt.target.value;
        this.setState({
            event: newEvent
        });
    }

    render() {
        const { handleCancel } = this.props;
        const { event } = this.state;
        return (
            <Segment>
                <Form onSubmit={this.onFormSubmit}>
                    <Form.Field>
                        <label>Event Title</label>
                        <input name='title' onChange={this.onInputChange} value={event.title} placeholder="Title Name" />
                    </Form.Field>
                    <Form.Field>
                        <label>Event Date</label>
                        <input name='date' onChange={this.onInputChange} value={event.date} type="date" placeholder="Event Date" />
                    </Form.Field>
                    <Form.Field>
                        <label>City</label>
                        <input name='city' onChange={this.onInputChange} value={event.city} placeholder="City event is taking place" />
                    </Form.Field>
                    <Form.Field>
                        <label>Venue</label>
                        <input name='venue' onChange={this.onInputChange} value={event.venue} placeholder="Enter the Venue of the event" />
                    </Form.Field>
                    <Form.Field>
                        <label>Hosted By</label>
                        <input name='hostedBy' onChange={this.onInputChange} value={event.hostedBy} placeholder="Enter the name of person hosting" />
                    </Form.Field>
                    <Button positive type="submit">
                        Submit
                      </Button>
                    <Button onClick={handleCancel} type="button">Cancel</Button>
                </Form>
            </Segment>
        );
    }
}

export default connect(mapState)(EventForm);