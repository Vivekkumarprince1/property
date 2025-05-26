import Home from './components/Home';
import Login from './components/Login';
import Dropdown from './components/Dropdown';
import About from './components/About';
import Liked from './components/Liked';
import Cruds from './components/Cruds';
import Pnotifications from './components/Pnotifications';
import SignUp from './components/SignUp';
import Customer_home from './components/customer_home';
import Invalid_user from './components/invalid_user';
import Admin from './components/Admin_home';
import {Route , Link , Routes} from "react-router-dom";
import {BrowserRouter as Router} from "react-router-dom";
import './App.css';

import React, { useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBIcon,
  MDBCollapse,
  MDBFooter, 
  MDBRow,
   MDBCol
} from 'mdb-react-ui-kit';

function App() {
  return (
    <div className="App">
      <h1 style={{backgroundColor:"#e1e5eb"}}>Ok Properties Ji</h1>
     {/* <a href="/Home">Home</a>
     <a href="/Login">Login</a>
    //  <a href="/Admin">Admin</a>
     <a href="/About">About</a>
     <a href="/SignUp">Signuo</a> */}


      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Cruds" element={<Cruds/>}/>
        <Route path="/liked" element={<Liked/>}/>
        <Route path="/Dropdown" element={<Dropdown/>}/>
        <Route path="/About" element={<About/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/SignUp" element={<SignUp/>}/>
        <Route path="/admin" element={<Admin/>} />
        <Route path="/Customer" element={<Customer_home/>} />
        <Route path="/invalid" element={<Invalid_user/>} />
        <Route path="/Pnotifications" element={<Pnotifications/>}/>
      </Routes>
<FooterJi/>      
    </div>
  );


function FooterJi() {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon color='secondary' icon='gem' className='me-3' />
                Company name
              </h6>
              <h5>
                Ok Properties Ji
              </h5>
              <p>Here we provides best properties which includes luxurious properties as well as properties according to middle class families. </p>
            </MDBCol>

            <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Luxury Houses
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Bigger Apartments
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  3 BHK's
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  2 BHK's
                </a>
              </p>
            </MDBCol>

            <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Pricing
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Settings
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Orders
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon color='secondary' icon='home' className='me-2' />
                Mohali, Punjab, INDIA
              </p>
              <p>
                <MDBIcon color='secondary' icon='envelope' className='me-3' />
                Okpropertiesji@gmail.com
              </p>
              <p>
                <MDBIcon color='secondary' icon='phone' className='me-3' /> + 91 237 767 83
              </p>
              <p>
                <MDBIcon color='secondary' icon='print' className='me-3' /> + 91 834 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2021 Copyright:
        <a className='text-reset fw-bold' href='https://okpropertiesji.com/'>
          Okpropertiesji.com
        </a>
      </div>
    </MDBFooter>
  );
}
}
export default App;
