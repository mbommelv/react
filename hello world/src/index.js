import React from 'react';
import ReactDOM from 'react-dom';

const Hello = (props) => (
    <div>
        <h1>hello react {props.name} you are {props.age} years old</h1>
    </div>
)
ReactDOM.render(<Hello name='Turnip Eater' age={51}/>, document.getElementById("root"));