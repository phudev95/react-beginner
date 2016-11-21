import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
    goToStore = (event) => {
        event.preventDefault();

        // First grap the text on the box
        let storeId = this.storeInput.value;
        console.log(`Going to ${storeId}`);

        //Second we're going to transition from / to /store/:storeId
        this.context.router.transitionTo(`/store/${storeId}`);
    };

    render () {
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                <h2>Please enter a Store</h2>
                <input type="text" required placeholder="Store Name" ref={(input) => this.storeInput = input} defaultValue={getFunName()}/>
                <button type="submit">Visit Store</button>
            </form>
        );
    }
}

StorePicker.contextTypes = {
    router: React.PropTypes.object
};

export default StorePicker;