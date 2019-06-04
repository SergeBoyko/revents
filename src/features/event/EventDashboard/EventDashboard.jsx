import React, { Component } from 'react';
import cuid from 'cuid';
import { connect } from 'react-redux'
import { Grid, Button } from 'semantic-ui-react'
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';
import { createEvent, deleteEvent, updateEvent } from './../eventActions';

const mapState = state => ({
    events: state.events
})

const actions = {
    createEvent,
    deleteEvent,
    updateEvent
}


class EventDashboard extends Component {
    state = {
        isOpen: false,
        selectedEvent: null
    }


    handleFormOpen = () => {
        this.setState({
            isOpen: true
        })
    }

    handleCancel = () => {
        console.log('handleCancel');
        this.setState({
            isOpen: false
        })
    }

    handleOpenEvent = (enentToOpen) => () => {
        this.setState({
            selectedEvent: enentToOpen,
            isOpen: true
        });
    }

    handleCreateEvent = (newEvent) => {
        newEvent.id = cuid();
        newEvent.hostPhotoURL = '/assets/user.png';
        //  const updatedEvents = [...this.state.events, newEvent];
        this.props.createEvent(newEvent)
        this.setState({
            //    events: updatedEvents,
            isOpen: false
        })

    }

    handleUpdateEvent = (updatedEvent) => {
        this.props.updateEvent(updatedEvent)
        this.setState({
            // events: this.state.events.map(event => {
            //     if (event.id === updatedEvent.id) {
            //         return Object.assign({}, updatedEvent)
            //     } else {
            //         return event;
            //     }
            // }),
            isOpen: false,
            selectedEvent: null
        })
    }

    handleDeleteEvent = (enentId) => () => {
        // const updatedEvents = this.state.events.filter(e => e.id !== enentId);
        // this.setState({ events: updatedEvents })
        this.props.deleteEvent(enentId);
    }


    render() {
        const { isOpen, selectedEvent } = this.state;
        const { events } = this.props;
        return (
            <Grid>
                <Grid.Column width={10}>
                    <EventList deleteEvent={this.handleDeleteEvent} events={events} onEventOpen={this.handleOpenEvent} />
                </Grid.Column>
                <Grid.Column width={6}>
                    <Button onClick={this.handleFormOpen} positive content="Create Event" />
                    {isOpen && <EventForm updateEvent={this.handleUpdateEvent} selectedEvent={selectedEvent} createEvent={this.handleCreateEvent} handleCancel={this.handleCancel} />}


                </Grid.Column>
            </Grid>
        );
    }
}

export default connect(mapState, actions)(EventDashboard);