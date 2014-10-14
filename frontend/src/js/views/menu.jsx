/** 
* @jsx React.DOM 
* */
var React = require('react');
var rbt = require('react-bootstrap');
var links = [
  {name: 'home', src:"/home"},
  {name: 'about', src:"/about"}
];

var moment = require('moment')

var Navbar = require('react-bootstrap/Navbar');
var Nav = require('react-bootstrap/Nav');
var NavItem = require('react-bootstrap/NavItem');
var DropdownButton = require('react-bootstrap/Dropdownbutton')
var MenuItem = require('react-bootstrap/MenuItem')


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
    clearInterval(this.interval)
  },
  render: function() {
    return (
     <Navbar>
      <Nav>
        <a className="navbar-brand" href="#">HackerHousing.IO</a>
        <NavItem key={1} href="#">Profile</NavItem>
        <NavItem key={2} href="#">Browse <i className="fa fa-bicycle"></i></NavItem>
        <DropdownButton key={3} title="Dropdown">
          <MenuItem key="1">Action</MenuItem>
          <MenuItem key="2">Another action</MenuItem>
          <MenuItem key="3">Something else here </MenuItem>
          <MenuItem divider />
          <MenuItem key="4">{this.state.date}</MenuItem>
        </DropdownButton>
      </Nav>
     </Navbar>
    );
  }
})

module.exports = menu;
