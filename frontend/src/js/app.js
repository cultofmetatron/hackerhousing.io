/** @jsx React.DOM */
var React = require('react');
window.react = React;
var Menu = require('./views/menu.jsx');

React.render(
  (<Menu date={new Date()}></Menu>),
  document.getElementById('topnav'))
  

