import React, { Component } from 'react';
import './App.css';
import { Input } from './components/Input.jsx';
import { Tracker } from './components/Tracker.jsx';
import Sortable from 'sortablejs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultTrackers: [
        'BTC', 'ETH', 'LTC', 'DOGE', 'XLM', 'XRP', 'IOTA'
      ],
      trackers: []
    }

    // Bindings
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e) {
    let inputValue = document.getElementById('input-text');

    if (e.key === 'Enter') {
      if (inputValue.value.length > 0) {
        this.setState({
          trackers: this.state.trackers.concat(<Tracker coin={e.target.value.toUpperCase().trim()} onClick={this.delete} />)
        });
        inputValue.value = '';
      } else {
        alert('There\'s nothing in the input field');
      }
    }
  }

  componentDidMount() {
    // Allows the elements to be draggable
    let drag = document.getElementById('active-trackers');
    Sortable.create(drag, {
      animation: 500
    });
  }

  delete(e) {
    // Selects selected tracker as variable card
    let card = e.target.parentNode.parentNode.parentNode.parentNode;

    // Adds animation of tracker fading away
    let opacity = 1;
    let height = 200;

    setInterval(() => {
      card.style.opacity = opacity -= 0.01;

      // This needs to be set separately because you can't subtract percentages
      height -= 10;
      card.firstElementChild.style.height = `${height}px`;

      if (opacity === 0) {
        clearInterval();
      } 
    }, 5);

    // Removes tracker after 1 second so the animation has time to show
    setTimeout(() => {
        card.parentNode.removeChild(card);
    }, 500);
  }

  render() {
    return (
      <div id="App">
        <Input
          onKeyPress={this.handleKeyPress} />

        <div id='active-trackers'>
          {/* Default coins */}
          {this.state.defaultTrackers.map((coin, i) => {
            return <div key={i}><Tracker coin={coin} onClick={this.delete} /></div>;
          })}

          {/* Render additional coins users input */}
          {this.state.trackers.map((coin, i) => {
            return <div key={i}>{coin}</div>;
          })}
        </div>

        {/* Footer */}
        <footer>Created by <a href='http://cristiangudino.com/' target='_blank'>Cristian Gudiño</a></footer>
      </div>
    );
  }
}

export default App;