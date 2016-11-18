import React from 'react';

// Components
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';

class App extends React.Component {
    constructor () {
        super();

        this.state = {
            fishes: {},
            order: {}
        };

        this.addFish = this.addFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
    }

    addFish (fish) {
        // Update our state
        const fishes = {...this.state.fishes};

        // Add in our fish
        const timestamp = Date.now();
        fishes[`fish-${timestamp}`] = fish;

        // Set state
        this.setState({fishes});
    }

    loadSamples () {
        this.setState({
            fishes: sampleFishes
        });
    }

    render () {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                </div>
                <Order />
                <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
            </div>
        );
    }
}

export default App;