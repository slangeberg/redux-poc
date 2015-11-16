import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting';

const pair = ['Trairnsporting', '28 Days Later'];
const vote = function() {
    console.warn('vote() - TBD');
}

ReactDOM.render(
    <Voting pair={pair} vote={vote} />,
    document.getElementById('app')
);