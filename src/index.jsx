import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting';

const pair = ['Trairnsporting', '28 Days Later'];

ReactDOM.render(
    <Voting pair={pair} />,
    document.getElementById('app')
);