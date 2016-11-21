import React from 'react';
import base from '../base';

// Components
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {
    constructor () {
        super();

        this.state = {
            uid: null,
            owner: null
        };
    }

    componentDidMount () {
        // Refresh State when it had backup in Store
        base.onAuth((user) => {
            if (user) {
                this.authHandler(null, {user});
            }
        });
    }

    logout () {
        console.log('Logout....');
        base.unauth();
        this.setState({
            uid: null
        });
    }

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

    authenticate (provider) {
        console.log(`Trying to log in with ${provider}`);
        base.authWithOAuthPopup(provider, this.authHandler);
    }

    authHandler = (err, authData) => {
        if (err) {
            console.error(err);
            return;
        }

        // Grab the store info
        const storeRef = base.database().ref(this.props.storeId);

        // Query the firebase once for the store data
        storeRef.once('value', (snapshot) => {
            // {fishes: {fish1: {...}, fish2: {...}}}
            const data = snapshot.val() || {};

            // Claim it as our own if there is no owner already
            if (!data.owner) {
                storeRef.set({
                    owner: authData.user.uid
                });
            }

            // Update state
            this.setState({
                uid: authData.user.uid,
                owner: data.owner || authData.user.uid
            });
        })
    };

    renderLogin () {
        return (
            <nav className="login">
                <h2>Inventory</h2>
                <p>Sign in to manage your store's inventory</p>
                <button className="github" onClick={() => this.authenticate('github')}>Log In with Github</button>
                <button className="facebook" onClick={() => this.authenticate('facebook')}>Log In with Facebook</button>
                <button className="twitter" onClick={() => this.authenticate('twitter')}>Log In with Twitter</button>
            </nav>
        );
    }

    render () {
        const logout = <button onClick={() => this.logout()}>Log Out!</button>;

        // Check if they are no logged in at all
        if (!this.state.uid) {
            return <div>{this.renderLogin()}</div>
        }

        // Check if they are are owner of the current store
        if (this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>Sorry you aren't the owner of this store!</p>
                    {logout}
                </div>
            );
        }

        // Return JSX
        return (
            <div>
                <p>Inventory</p>
                {logout}
                {Object.keys(this.props.fishes).map((key) => this.renderInvenoty(key))}
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSamples}>Load sample fishes</button>
            </div>
        );
    }
}

Inventory.propTypes = {
    fishes: React.PropTypes.object.isRequired,
    storeId: React.PropTypes.string.isRequired,
    removeFish: React.PropTypes.func.isRequired,
    updateFish: React.PropTypes.func.isRequired,
    addFish: React.PropTypes.func.isRequired,
    loadSamples: React.PropTypes.func.isRequired,
};

export default Inventory;