import React from 'react';

// Components
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {
    render () {
        return (
            <div>
                <p>Inventory</p>
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSamples}>Load sample fishes</button>
            </div>
        );
    }
}

export default Inventory;