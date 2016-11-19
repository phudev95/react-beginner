import React from 'react';

// Components
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';

import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
    constructor () {
        super();

        this.state = {
            fishes: {},
            order: {}
        };

        this.addFish = this.addFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
    }

    componentWillMount () {
        this.ref = base.syncState(`${this.props.params.storeId}/fishes`,{
            context: this,
            state: 'fishes'
        });
    }

    componentWillUnmount () {
        base.removeBinding(this.ref);
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

    addToOrder (key) {
        let order = {...this.state.order};
        order[key] = order[key] + 1 || 1;

        this.setState({order});
    }

    render () {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="list-of-fishes">
                        {
                            // [<Fish />, <Fish />, ...]
                            Object
                                .keys(this.state.fishes)
                                .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)
                        }
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order} />
                <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
            </div>
        );
    }
}

export default App;