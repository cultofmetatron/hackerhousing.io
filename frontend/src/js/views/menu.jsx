/** @jsx React.DOM */
var React = require('react');

var links = [
  {name: 'home', src:"/home"},
  {name: 'about', src:"/about"}
];


var Navbar = require('react-bootstrap/Navbar');
var Nav = require('react-bootstrap/Nav');
var NavItem = require('react-bootstrap/NavItem');
//var Nav, Navbar, NavItem

var menu = React.createClass({
  render: function() {
    return (
      <Navbar>
        <Nav>
          <NavItem key={1} href="#">Link 1</NavItem>
          <NavItem key={2} href="#">Link 2</NavItem>
        </Nav>
      </Navbar>
    );
  }
})

module.exports = menu;
