var React = require('react');
window.react = React;
var Menu = require('./views/menu.jsx');

React.renderComponent(Menu(), document.getElementById('topnav'))
