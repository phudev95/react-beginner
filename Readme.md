## Knowledge
### Stateless Functional Components

```javascript
import React from 'react';

class Order extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            isLoggedIn : false
        };

        // fn.call({}, ....)
        // fn.apply({}, [...])
        // this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin = (e) => {
        console.log(this);
        this.setState( {isLoggedIn: true});
    };

    /*handleLogin (e) {
        console.log(this);
        this.setState( {isLoggedIn: true});
    };*/

    render() {
        return (
            <div onClick={this.handleLogin}>
                <p>aaaaaaaaaaaaaa</p>
            </div>
        );
    }
}

export default Order;
```