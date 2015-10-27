"use strict";
var config = require('./config');
var cell = require('./cell');
var React = require('react');
var ReactDOM = require('react-dom');

var Main = React.createClass({
    getInitialState: function () {
        return {
            horizontal: [],
            vertical: []
        }
    },
    load: function () {
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
    triggerAll: function () {

    },
    clear: function () {
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
    render: function () {
        var ths = [];
        for (var i = 0; i < this.props.vertical.length; i++) {
            ths.push(<th key={i}>{i + 1}</th>)
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
                    <Rows horizontal={this.props.horizontal} />
                </table>
            </div>
        )
    }
});

var Rows = React.createClass({
    render: function () {
        var getCells = function (row) {
            var cells = [];
            row.row.map(function (cell, index) {
                cells.push(
                    <Cell key={index} cell={cell}/>
                )
            });

            return cells;
        };

        var rows = [];
        for (var j = 0; j < this.props.horizontal.length; j++) {
            var row = this.props.horizontal[j];
            rows.push(
                <tr key={j}>
                    <th>{j + 1}</th>
                    {getCells(row)}
                </tr>
            )
        }

        return (
            <tbody>
                {rows}
            </tbody>
        );
    }
});

var Cell = React.createClass({
    getInitialState: function(){
        return {
            cell: this.props.cell
        }
    },
    trigger: function(){
        var self = this;

        setTimeout(function () {
            var cell = self.state.cell;
            cell.isTriggered = true;
            self.setState({
                cell: cell
            });
        }, cell.generateRandomTimeout());
    },
    componentDidUpdate: function(instance) {
        this.getDOMNode().setAttribute('bgcolor', this.state.cell.bgcolor());
    },
    render: function () {
        return (
            <th bgcolor={this.state.cell.bgcolor()}>
                <a href="/#" onClick={this.trigger} className="react-cell">{this.state.cell.text()}</a>
            </th>
        );
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

    self.bgcolor = function(){
        return self.isTriggered ? "CCCCFF" : "FFFFFF";
    }
};