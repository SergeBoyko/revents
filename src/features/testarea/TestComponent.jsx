import React, { Component } from 'react';
import { connect } from 'react-redux'
import { incrementCounter, decrementCounter } from './testActions';
import { Button } from 'semantic-ui-react';

const mapState = (state) => ({
    data: state.test.data
});

const actions = {
    incrementCounter,
    decrementCounter
}

class TestComponent extends Component {
    state = {}
    render() {
        const { incrementCounter, decrementCounter, data } = this.props;
        return (
            <div>
                <h3>Test</h3>
                <div>The answer is : {data}</div>
                <Button onClick={incrementCounter} color='green' content='Increment' />
                <Button onClick={decrementCounter} color='orange' content='Decrement' />
            </div>
        );
    }
}

export default connect(mapState, actions)(TestComponent);