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
    if (e.key === 'Enter') {
      this.setState({
        trackers: this.state.trackers.concat(<Tracker coin={e.target.value.toUpperCase().trim()} onClick={this.delete} />)
      });
      document.getElementById('input-text').value = '';
    }
  }

  componentDidMount() {
    let drag = document.getElementById('active-trackers');
    Sortable.create(drag, {
      animation: 500
    });
  }

  delete(e) {
    // Selects selected tracker as variable card
    let card = e.target.parentNode.parentNode.parentNode;
    // Adds animation of tracker fading away
    let opacity = 1;
    let height = 300;

    console.log(e.target);

    setInterval(() => {
      card.style.opacity = opacity -= 0.01;

      // This needs to be set separately because you can't subtract percentages
      height -= 10;
      card.style.height = `${height}px`;

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
    for (let i = 0; i < this.state.trackers.length; i++) {
      /*  FILL THIS IN
          Make it so it goes through this.state.trackers
          and console logs each one to see if you can get their properties logged
          Then you can do an if statement to delete the ones that aren't cryptos
      */
    }

    return (
      <div id="App">
        <Input
          onKeyPress={this.handleKeyPress} />

        <div id='active-trackers'>
          {/* Default coins */}
          {this.state.defaultTrackers.length > 0 &&
            this.state.defaultTrackers.map((coin, i) => {
              return <div key={i}><Tracker coin={coin} onClick={this.delete} /></div>;
            })}

          {/* Render additional coins users input */}
          {this.state.trackers.map((coin, i) => {
            return <div key={i}>{coin}</div>;
          })}
        </div>

        {/* Footer */}
        <footer>Created by <a href='CristianGudino.com' target='_blank'>Cristian Gudiño</a></footer>
      </div>
    );
  }
}

export default App;