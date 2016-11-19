import React from 'react';
import { formatPrice } from '../helpers';

class Order extends React.Component {
    renderOrder (key) {
        const { fishes, order } = this.props;
        const fish = fishes[key];
        const count = order[key];

        if (!fish || fish.status === 'unavailable') {
            return <li key={key}>Sorry, {fish ? fish.name : 'fish'} is no longer available!</li>
        }

        return (
            <li key={key}>
                <span>{count} lbs {fish.name}</span>
                <span className="price">{formatPrice(count * fish.price)}</span>
            </li>
        );
    }

    render () {
        const { fishes, order } = this.props;
        const orderIds = Object.keys(order);
        const total = orderIds.reduce((prevTotal, index) => {
            const fish = fishes[index];
            const count = order[index];
            const isAvailable = fish && fish.status === 'available';
            if (isAvailable) {
                return prevTotal + (fish.price * count);
            }
            return prevTotal;
        }, 0);

        return (
            <div className="order-wrap">
                <h2>Your Order</h2>
                <ul className="order">
                    {orderIds.map((key) => this.renderOrder(key))}
                    <li className="total">
                        {formatPrice(total)}
                    </li>
                </ul>
            </div>
        );
    }
}

export default Order;