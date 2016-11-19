import React from 'react';

// Components
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {
    renderInvenoty (key) {
        const { fishes } = this.props;
        const fish = fishes[key];

        return (
            <div key={key} className="fish-edit">
                <input type="text" name="name" value={fish.name} placeholder="Fish Name" onChange={(e) => this.handleChange(e, key)}/>
                <input type="text" name="price" value={fish.price} placeholder="Fish Price" onChange={(e) => this.handleChange(e, key)}/>
                <select type="text" name="status" value={fish.status} onChange={(e) => this.handleChange(e, key)}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea name="desc" value={fish.desc} placeholder="Fish Desc" onChange={(e) => this.handleChange(e, key)}/>
                <input type="text" name="image" value={fish.image} placeholder="Fish Image" onChange={(e) => this.handleChange(e, key)}/>
                <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
            </div>
        )
    }

    handleChange (e, key) {
        const fish = this.props.fishes[key];

        // Take a copy of that fish and update it with the new data
        const updateFish = {
            ...fish,
            [e.target.name]: e.target.value
        };

        // Update fish in fishes of state on component parent
        this.props.updateFish(key, updateFish);
    }

    render () {
        return (
            <div>
                <p>Inventory</p>
                {Object.keys(this.props.fishes).map((key) => this.renderInvenoty(key))}
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSamples}>Load sample fishes</button>
            </div>
        );
    }
}

export default Inventory;