import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import cuid from 'cuid';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { createEvent, updateEvent } from '../eventActions';
import TextInput from './../../../app/common/form/TextInput';
import TextArea from './../../../app/common/form/TextArea';
import SelectInput from './../../../app/common/form/SelectInput';



const mapState = (state, ownProps) => {
    const eventId = ownProps.match.params.id;

    let event = {};

    if (eventId && state.events.length > 0) {
        event = state.events.filter(event => event.id === eventId)[0];
    }

    return {
        initialValues: event
    }

}

const actions = {
    createEvent,
    updateEvent
}

const category = [
    { key: 'drinks', text: 'Drinks', value: 'drinks' },
    { key: 'culture', text: 'Culture', value: 'culture' },
    { key: 'film', text: 'Film', value: 'film' },
    { key: 'food', text: 'Food', value: 'food' },
    { key: 'music', text: 'Music', value: 'music' },
    { key: 'travel', text: 'Travel', value: 'travel' },
];

class EventForm extends Component {
    // state = {
    //     event: Object.assign({}, this.props.event)
    // }

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



    onFormSubmit = values => {
        if (this.props.initialValues.id) {
            this.props.updateEvent(values);
            this.props.history.goBack();
        } else {
            const newEvent = {
                ...values,
                id: cuid(),
                hostPhotoURL: '/assets/user.png'
            }
            this.props.createEvent(newEvent);
            this.props.history.push('/events');
        }

        // evt.preventDefault();
        // if (this.state.event.id) {
        //     this.props.updateEvent(this.state.event);
        //     this.props.history.push('/events');
        // } else {
        //     const newEvent = {
        //         ...this.state.event,
        //         id: cuid(),
        //         hostPhotoURL: '/assets/user.png'
        //     }
        //     this.props.createEvent(newEvent);
        //     this.props.history.push('/events');
        // }
    }



    render() {

        return (
            <Grid.Column width={10}>
                <Segment>
                    <Header sub color='teal' content='Event Details' />
                    <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
                        <Field name='title' type='text' component={TextInput} placeholder='Give your event a name' />
                        <Field name='category' type='text' component={SelectInput} options={category} placeholder='What is your event about' />
                        <Field name='description' type='text' component={TextArea} rows={3} placeholder='Tell us about your event' />
                        <Header sub color='teal' content='Event Location Details' />
                        <Field name='city' type='text' component={TextInput} placeholder='Event City' />
                        <Field name='venue' type='text' component={TextInput} placeholder='Event Venue' />
                        <Field name='date' type='text' component={TextInput} placeholder='Event Date' />
                        {/* <Form.Field> 
                        <label>Event Title</label>
                        <input name='title' onChange={this.onInputChange} value={event.title} placeholder="Title Name" />
                    </Form.Field> */}

                        <Button positive type="submit">
                            Submit
                      </Button>
                        <Button onClick={this.props.history.goBack} type="button">Cancel</Button>
                    </Form>
                </Segment>
            </Grid.Column>
        );
    }
}

export default connect(mapState, actions)(reduxForm({ form: 'eventForm', enableReinitialize: true })(EventForm)); 