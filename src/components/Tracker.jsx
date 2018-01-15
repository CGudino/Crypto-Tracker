import React, { Component } from 'react';

export class Tracker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price: '',
            activeCoin: ''
        }
    }

    // Function for fetching the price from the api
    componentDidMount() {
        // Switch statement for reducing coin names to the initials
        let coinInput;
        switch(this.props.coin) {
            case 'BITCOIN':
                coinInput = 'BTC';
                break;
            case 'ETHEREUM':
                coinInput = 'ETH';
                break;
            case 'LITECOIN':
                coinInput = 'LTC';
                break;
            case 'IOTA':
            case 'MIOTA':
                coinInput = 'IOTA';
                break;
            case 'RIPPLE':
                coinInput = 'XRP';
                break;
            case 'STELLAR':
                coinInput = 'XLM';
                break;
            default:
                coinInput = this.props.coin;
                break;
        }

        setInterval(() => {
            // This is the api url for getting price of cryptos
            // Replace fsym= to change currency
            const url = `https://min-api.cryptocompare.com/data/price?fsym=${coinInput}&tsyms=USD`;
            
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        price: data.USD,
                        activeCoin: coinInput
                    });
                });
        }, 5000);
    }

    // Get logo of coin
    getLogo(e) {
        switch(e) {
            case 'BTC':
                return <img className='coin-logo' src={require('../pictures/Bitcoin.jpg')} alt='Bitcoin logo' />;
                break;
            case 'ETH':
                return <img className='coin-logo' src={require('../pictures/Ethereum.png')} alt='Ethereum logo' />
                break;
            case 'LTC':
                return <img className='coin-logo' src={require('../pictures/Litecoin.png')} alt='Litecoin logo' />
                break;
            case 'DOGE':
                return <img className='coin-logo' src={require('../pictures/Dogecoin.png')} alt='Doge logo' />
                break;
            case 'IOTA':
                return <img className='coin-logo' src={require('../pictures/Iota.png')} alt='Iota logo' />
                break;
            case 'XRP':
                return <img className='coin-logo' src={require('../pictures/Ripple.jpeg')} alt='Ripple logo' />
                break;
            case 'XLM':
                return <img className='coin-logo' src={require('../pictures/Stellar.png')} alt='Stellar logo' />
                break;
            default:
                return <img className='coin-logo' src={require('../pictures/Default.png')} alt='Cryptocurrency logo' />
                break;
        };
    };

    render() {
        return (
            <div className='tracker'>
            {/* Gotta fix it so it doesn't show as "Not found" at first */}
            {this.state.price > 0 ?
                <div>
                    <div className='delete'>
                        <img
                            src={require('../pictures/Delete.png')}
                            alt='Delete'
                            onClick={this.props.onClick} />
                    </div>

                    <div className='coin-name'>
                        {this.state.activeCoin}
                    </div>

                    {this.getLogo(this.state.activeCoin)}
                        
                    <div className='coin-price'>
                        ${this.state.price}
                    </div>
                </div>
                :
                <div className='loading'>
                    <img
                        src={require('../pictures/Loading.png')}
                        alt='Loading...' />
                </div>
            }
            </div>
        );
    }
}