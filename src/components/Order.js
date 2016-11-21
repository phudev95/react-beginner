import React from 'react';
import { formatPrice } from '../helpers';
import CSSTransitionGroup from 'react-addons-css-transition-group';

class Order extends React.Component {
    renderOrder (key) {
        const { fishes, order } = this.props;
        const fish = fishes[key];
        const count = order[key];
        const removeButton = <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>;

        if (!fish || fish.status === 'unavailable') {
            return <li key={key}>Sorry, {fish ? fish.name : 'fish'} is no longer available! {removeButton}</li>
        }

        return (
            <li key={key}>
                <span>
                    <CSSTransitionGroup
                        component="span"
                        className="count"
                        transitionName="count"
                        transitionEnterTimeout={250}
                        transitionLeaveTimeout={250}
                    >
                        <span key={count}>{count}&nbsp;</span>
                    </CSSTransitionGroup>
                    lbs {fish.name} {removeButton}
                    </span>
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

                <CSSTransitionGroup
                    className="order"
                    component="ul"
                    transitionName="order"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    {orderIds.map((key) => this.renderOrder(key))}
                    <li className="total">
                        {formatPrice(total)}
                    </li>
                </CSSTransitionGroup>
            </div>
        );
    }
}

Order.propTypes = {
    removeFromOrder: React.PropTypes.func.isRequired
};

export default Order;