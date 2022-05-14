import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../elements/img/icon.png';
import User from '../User/User'
import imgIcon from './ic.png'

const Navi = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky = "top">
            <Navbar.Brand> <Link to="/"> <img src={imgIcon} style={{height:'60px'}}  alt="logo" /> </Link> </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav"> 
            {
            localStorage.getItem("token")==null ? 
            <Nav className="ml-auto">
            <Nav.Link as={Link} to="/login" style = {{fontSize : '18px', color:'#00CC99'}}>
           <i className = "fa fa-user-circle pr-2"></i>
           <span>Login</span>
           </Nav.Link>
           <Nav.Link as={Link} to="/reg" style = {{fontSize : '18px', color:'#00CC99'}}>
                   <i className = "fa fa-registered pr-2"></i>
                   <span>Register</span>
           </Nav.Link>
           </Nav>  :
           <Nav className="ml-auto">
           <Nav.Link as={Link} to="/favourites" style = {{fontSize : '18px', color:'#00CC99'}}>
           <i className = "fas fa-heart pr-2 text-danger"></i>
                   <span>Favorite Movies</span>
           </Nav.Link>
           <Nav.Link as={Link} to="/user" style = {{fontSize : '18px', color:'#00CC99'}}>
           <i className = "fa fa-user-circle pr-2"></i>
           <span>{User}User</span>
           </Nav.Link>
           <Nav.Link as={Link} onClick={() => {
                       localStorage.removeItem("token");
                       window.location = "/logout";
           }} style = {{fontSize : '18px',color:'#00CC99'}}>
           <i class="fa fa-sign-out" aria-hidden="true"></i>
                   <span>Logout</span>
           </Nav.Link>
       </Nav>           
                            
                }
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navi;
