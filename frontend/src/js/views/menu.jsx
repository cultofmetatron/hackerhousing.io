/** 
* @jsx React.DOM 
* */
var React = require('react');
var links = [
  {name: 'home', src:"/home"},
  {name: 'about', src:"/about"}
];

var mui = require('material-ui');
var PaperButton = mui.PaperButton;

var moment = require('moment')

var menu = React.createClass({
  getInitialState: function() {
    return {date: moment().format('MMMM Do YYYY, h:mm:ss a')};
  },
  tick: function() {
    this.setState({date: moment().format('MMMM Do YYYY, h:mm:ss a') });
  },
  componentDidMount: function() {
    this.interval = setInterval(this.tick, 0);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  render: function() {
    return (
      <div>
        <h1 className="{this.state.date}">TimePolice!</h1>
        <PaperButton type="RAISED" label={ "Time:  " + this.state.date}></PaperButton>
      </div>
    );
  }
})

module.exports = menu;
