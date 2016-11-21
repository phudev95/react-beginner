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
    }

    // Setup Firebase to this Component
    componentWillMount () {
        // This runs right before the <App/> is rendered
        this.ref = base.syncState(`${this.props.params.storeId}/fishes`,{
            context: this,
            state: 'fishes'
        });

        // Check if there is any order in localStorage
        const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
        if (localStorageRef) {
            this.setState({
                order: JSON.parse(localStorageRef)
            });
        }
    }

    // Remove Firebase without this Component
    componentWillUnmount () {
        base.removeBinding(this.ref);
    }

    // Update localStorage when order have change
    componentWillUpdate (nextProps, nextState) {
        localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
    }

    addFish = (fish) => {
        // Update our state
        const fishes = {...this.state.fishes};

        // Add in our fish
        const timestamp = Date.now();
        fishes[`fish-${timestamp}`] = fish;

        // Set state
        this.setState({fishes});
    };

    loadSamples = () => {
        this.setState({
            fishes: sampleFishes
        });
    };

    addToOrder = (key) => {
        let order = {...this.state.order};
        order[key] = order[key] + 1 || 1;

        this.setState({order});
    };

    updateFish = (key, fish) => {
        const fishes = {
            ...this.state.fishes,
            [key]: fish
        };

        this.setState({fishes});
    };

    removeFish = (key) => {
        const fishes = {...this.state.fishes};
        fishes[key] = null;

        this.setState({fishes});
    };

    removeFromOrder = (key) => {
        const order = {...this.state.order};
        delete order[key];

        this.setState({order});
    };

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
                <Order
                    fishes={this.state.fishes}
                    order={this.state.order}
                    removeFromOrder={this.removeFromOrder}
                />
                <Inventory
                    addFish={this.addFish}
                    loadSamples={this.loadSamples}
                    fishes={this.state.fishes}
                    updateFish={this.updateFish}
                    removeFish={this.removeFish}
                    storeId={this.props.params.storeId}
                />
            </div>
        );
    }
}

export default App;