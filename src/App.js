import React, { Component } from 'react';
import './App.css';
import { Input } from './components/Input.jsx';
import { Tracker } from './components/Tracker.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trackers: []
    }

    // Bindings
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.setState({
        trackers: this.state.trackers.concat(<Tracker coin={e.target.value} />)
      });
      document.getElementById('input-text').value = '';
    }
  }

  render() {
    return (
      <div id="App">
        <Input
          onKeyPress={this.handleKeyPress} />

        <div id='active-trackers'>
          {this.state.trackers.map((coin, i) => {
            return <div key={i}>{coin}</div>
          })}
        </div>
      </div>
    );
  }
}

export default App;