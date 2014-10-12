/** 
* @jsx React.DOM 
* */
var React = require('react');
var rbt = require('react-bootstrap');
var links = [
  {name: 'home', src:"/home"},
  {name: 'about', src:"/about"}
];


var Navbar = require('react-bootstrap/Navbar');
var Nav = require('react-bootstrap/Nav');
var NavItem = require('react-bootstrap/NavItem');
var DropdownButton = require('react-bootstrap/Dropdownbutton')
var MenuItem = require('react-bootstrap/MenuItem')


var menu = React.createClass({
  render: function() {
    return (
     <Navbar>
      <Nav>
        <NavItem key={1} href="#">Link</NavItem>
        <NavItem key={2} href="#">Link <i className="fa fa-bicycle"></i></NavItem>
        <DropdownButton key={3} title="Dropdown">
          <MenuItem key="1">Action</MenuItem>
          <MenuItem key="2">Another action</MenuItem>
          <MenuItem key="3">Something else here </MenuItem>
          <MenuItem divider />
          <MenuItem key="4">Separated link</MenuItem>
        </DropdownButton>
      </Nav>
     </Navbar>    
    );
  }
})

module.exports = menu;
