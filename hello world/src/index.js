import React from 'react';
import ReactDOM from 'react-dom';

const name = "Alouiscious Anaximander";

const Hello = (props) => (
    <div>
        <h1>hello react {props.name} you are {props.age} years old</h1>
    </div>
)
ReactDOM.render(<Hello name='john the ripper' age={11}/>, document.getElementById("root"));