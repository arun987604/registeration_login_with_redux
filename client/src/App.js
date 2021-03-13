import React from 'react'
import logo from './logo.svg';
import Register from './login_register/register';
import Login from './login_register/login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {Navbar,Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  var name = "arun";
  return (
    <Router>
      
      <Navbar bg="dark" variant="dark">
    <Nav className="mr-auto">
      <Nav.Link href="#"><Link to="/login">login</Link></Nav.Link>
      <Nav.Link href="#"><Link to="/signup">signup</Link></Nav.Link>
    </Nav>
    
  </Navbar>
     
      <Switch className="screen">
        
        <Route path="/signup">
       <Register> </Register>
        </Route>
        <Route path="/login">
       <Login> </Login>
        </Route>
        <Route path="/">
        <h1>welcome :)</h1>
          </Route>
      </Switch>
    </Router>
  );
}

export default App;
