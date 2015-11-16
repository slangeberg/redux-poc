import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({

    //Immutable data ensures shallow change checks should pass - PureRenderMixin should be perf boost
    mixins: [PureRenderMixin],

    getPair: function() {
        return this.props.pair || [];
    },
    render: function() {
        return <div className="voting">
            {this.getPair().map(entry =>
                <button key={entry}
                        onClick={() => this.props.vote(entry)}>
                    <h1>{entry}</h1>
                </button>
            )}
        </div>;
    }
});