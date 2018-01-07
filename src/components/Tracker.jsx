import React, { Component } from 'react';

export class Tracker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price: ''
        }
    }

    // Function for fetching the price from the api
    componentDidMount() {
        setInterval(() => {
            // This is the api url for getting price of cryptos
            // Replace fsym= to change currency
            const url = `https://min-api.cryptocompare.com/data/price?fsym=${this.props.coin}&tsyms=USD`;
            
            fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    price: data.USD
                });
            });
        }, 1000);
    }

    // Get logo of coin
    getLogo(e) {
        switch(e) {
            case 'BTC':
                return <img className='coin-logo' src={require('../pictures/Bitcoin.jpg')} />;
                break;
            case 'ETH':
                return <img className='coin-logo' src={require('../pictures/Ethereum.png')} />
                break;
            case 'LTC':
                return <img className='coin-logo' src={require('../pictures/Litecoin.png')} />
                break;
            case 'DOGE':
                return <img className='coin-logo' src={require('../pictures/Dogecoin.png')} />
                break;
            default:
                return <img className='coin-logo' src={require('../pictures/Default.png')} />
                break;
        };
    };

    render() {
        return (
            <div className='tracker'>
            {/* Gotta fix it so it doesn't show as "Not found" at first */}
            {this.state.price > 0 ?
                <div>
                    <div className='coin-name'>
                        {this.props.coin}
                    </div>

                    {this.getLogo(this.props.coin)}
                        
                    <div className='coin-price'>
                        ${this.state.price}
                    </div>
                </div>
                :
                <div className='coin-error'>
                    Not found
                </div>
            }
            </div>
        );
    }
}


/*
case '   ':
    return <img className='coin-logo' src={require('../pictures/   .jpg')} />
    break;
case '   ':
    return <img className='coin-logo' src={require('../pictures/   .jpg')} />
    break;
case '   ':
    return <img className='coin-logo' src={require('../pictures/   .jpg')} />
    break;
*/