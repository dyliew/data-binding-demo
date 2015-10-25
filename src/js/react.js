"use strict";

var React = require('react');
var ReactDOM = require('react-dom');

var Main = React.createClass({
    render: function () {
        return (
            <div className="panel-heading">
                <h3>ReactJS</h3>

                <div>
                    <button className="btn btn-default" >Load</button>
                    <button className="btn btn-default" >Trigger All</button>
                    <button className="btn btn-default" >Clear</button>
                </div>
            </div>
        );
    }
});

ReactDOM.render(<Main />, document.getElementById('react'));