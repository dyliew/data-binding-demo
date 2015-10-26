"use strict";
var config = require('./config');
var cell = require('./cell');
var React = require('react');
var ReactDOM = require('react-dom');

var Main = React.createClass({
    getInitialState: function(){
        return {
            horizontal: [],
            vertical: []
        }
    },
    load: function(){
        this.setState({
            horizontal: [],
            vertical: []
        });

        var horizontal = this.state.horizontal;
        var vertical = this.state.vertical;

        for (var i = 0; i < config.dimension.y(); i++) {
            var row = new rowViewModel();

            for (var j = 0; j < config.dimension.x(); j++) {
                row.row.push(new cellViewModel(this));
            }

            horizontal.push(row);
        }

        for (var k = 0; k < config.dimension.x(); k++) {
            vertical.push(k);
        }

        this.setState({
            horizontal: horizontal,
            vertical: vertical
        });
    },
    triggerAll: function(){
        this.state.horizontal.forEach(function(row) {
            row.row.forEach(function (cell) {
                cell.trigger();
            })
        })
    },
    clear: function(){
        this.setState({
            horizontal: [],
            vertical: []
        });
    },
    render: function () {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3>ReactJS</h3>
                    <div>
                        <button className="btn btn-default" onClick={this.load}>Load</button>
                        <button className="btn btn-default" onClick={this.triggerAll}>Trigger All</button>
                        <button className="btn btn-default" onClick={this.clear}>Clear</button>
                    </div>
                </div>
                { this.state.horizontal.length == 0 ? null : <Body horizontal={this.state.horizontal} vertical={this.state.vertical}/> }
            </div>
        )
    }
});

var Body = React.createClass({
    render: function(){
        var getCells = function(row){
            var cells = [];
            row.row.map(function(cell, index){
                cells.push(
                    <th key={index}>
                        <a href="/#" onClick={cell.trigger}>{cell.text()}</a>
                    </th>
                )
            });

            return cells;
        };

        var ths = [];
        for (var i=0;i<this.props.vertical.length;i++){
            ths.push(<th key={i}>{i+1}</th>)
        }

        var rows = [];
        for (var j=0;j<this.props.horizontal.length;j++){
            var row = this.props.horizontal[j];
            rows.push(
                <tr key={j}>
                    <th>{j+1}</th>
                    {getCells(row)}
                </tr>
            )
        }

        return (
            <div className="panel-body">
                <table className="table table-bordered table-condensed">
                    <thead>
                        <tr>
                            <th>#</th>
                            {ths}
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        )
    }
});

ReactDOM.render(<Main />, document.getElementById('react'));

var rowViewModel = function () {
    this.row = [];
};

var cellViewModel = function (ctx) {
    var self = this;

    self.isTriggered = false;

    self.text = function () {
        return self.isTriggered ? "1" : "0";
    };

    self.trigger = function () {
        setTimeout(function () {
            self.isTriggered = true;
            ctx.forceUpdate();
        }, cell.generateRandomTimeout());
    }
};