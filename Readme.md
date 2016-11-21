## Introduction
> Link: [https://ns-zbunyvbzjy.now.sh/](https://ns-zbunyvbzjy.now.sh/)

## Setup
```
1. clone source from github to local
2. cd <react-beginner>
3. npm install
4. npm start
```

## Command-scripts
```
* npm run watch (Watching any file with ext *.styl have change)
* npm run build (Deploy source code from development to production)
* npm run eject (Eject all configs of react-scripts from black to white ^^)
```


## Deploy to now.sh
> npm i -g now now-serve (If you not install it then run this command script, otherwise you can skip it)
```
1. npm run build
2. npm run deploy
```

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

## References
* [Rebase: Support using Firebase to connect data](https://github.com/tylermcginnis/re-base)
* [Features of ES6](https://github.com/lukehoban/es6features/blob/master/README.md)
* [React Stateless Functional Components](https://medium.com/@housecor/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc#.yi4u3n55g)