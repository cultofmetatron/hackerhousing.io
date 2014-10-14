/** @jsx React.DOM */
var React = require('react');
window.react = React;
var Menu = require('./views/menu.jsx');

React.renderComponent(
  (<Menu date={new Date()}></Menu>),
  document.getElementById('topnav'))
  

