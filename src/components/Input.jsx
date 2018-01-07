import React, { Component } from 'react';

export class Input extends Component {
    render() {
        return (
            <div id='input'>
                <h1>Search for a cryptocurrency to track!</h1>
                <input
                    id='input-text'
                    placeholder='Search...'
                    onKeyPress={this.props.onKeyPress} />
            </div>
        );
    }
}