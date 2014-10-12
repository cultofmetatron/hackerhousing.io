var React = require('react');

var links = [
  {name: 'home', src:"/home"},
  {name: 'about', src:"/about"}
];

var menu = React.createClass({
  render: function() {
    return (
      <h1> hello world I am groot! hear me roar</h1>
    );
  }
})

module.exports = menu;
