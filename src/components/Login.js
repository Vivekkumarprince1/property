import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React,{ useContext, useEffect, useState } from 'react';
import '../App.css';
import { NavLink as Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import { createNotification } from './notification';
import 'react-toastify/dist/ReactToastify.css';
import NoteContext from '../useContext/NoteContext';

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

function Login() {

  const [error, setError] = useState([]);

  const navigate = useNavigate();
  const valueContext= useContext(NoteContext)

  const [user, setUser] = useState({
    email: '', password: '',
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]:e.target.value
    });
  };

  const validForm = (e) => {
    const { email, password } = user;
    const formError = {};
    console.log('form validation')
    var regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    let isValue = true;

    if (!email) {
      formError["emailError"] = "email is required";
      isValue = false;
    } else if (!regEmail.test(email)) {
      formError["emailError"] = "email pattern wont match";
      isValue = false;
    }
    if (!password || password.length < 4) {
      formError["passwordError"] = "password is required";
      isValue = false;
    }

    setError(formError);
    return isValue;
  };

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  async function onlogin(e) {
    e.preventDefault();

    const val = validForm();
    console.log(val);

    if (val) {
      try {
        const config = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        }
        const response= await fetch('http://localhost:8000/login',config)
        const json = await response.json();
        console.log(json);
        

        localStorage.setItem("username", json[0].name);
        localStorage.setItem("type",JSON.stringify( json[0].type))
       
        if (json.length === 0) {
          createNotification("warning", 'invalid user,please try again');
        }
        else if (json[0].type === "provider") {
          console.log(json[0].type);
          localStorage.setItem("provider", JSON.stringify(json[0].type))
          localStorage.setItem("providername", json[0].name)

          createNotification("success", 'welcome to provider panel');
          setTimeout(() => {

            navigate("/Dropdown");
          }, 1000)
        }
        else if (json[0].type === "customer") {
          console.log(json[0].type);
          localStorage.setItem("customer", JSON.stringify(json[0].type));
          localStorage.setItem("customername", json[0].name)
          createNotification("success", 'welcome to customer panel');
          setTimeout(() => {

            navigate("/Customer");
          }, 1000)
        }
        else if (json[0].type === "admin") {
          console.log(json[0].type);
          localStorage.setItem("admin", JSON.stringify(json[0].type))
          localStorage.setItem("adminname", json[0].name)
          createNotification("success", 'welcome to admin panel');
          setTimeout(() => {

            navigate("/admin");
          }, 1000)
        }
      }
      catch (err) {
        createNotification("warning", 'user is not authorized');

      }
    }

  }

  return (
    <div>
      <ToastContainer />

      {/* ======= Header ======= */}
      <header id="header" className="header fixed-top d-flex align-items-center">
        <div className="container d-flex align-items-center justify-content-between">
          <Link to="/" className="logo d-flex align-items-center me-auto me-lg-0">

            <h1>Ok <span>Properties</span></h1>
          </Link>

          <i className="mobile-nav-toggle mobile-nav-show bi bi-list" />
          <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x" />
        </div>
      </header>{/* End Header */}
      <br />
      <Navji/>
      <br />
      <body className="bg-gradient-primary">

        <div className="container">


          <div className="row justify-content-center">

            <div className="col-xl-10 col-lg-12 col-md-9">

              <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">

                  <div className="row">
                    <div className="col-lg-6 d-none d-lg-block"><img src="prop1.png" height="600px" width="500px" alt='login'></img></div>
                    <div className="col-lg-6">
                      <div className="p-5">
                        <div className="text-center">
                          <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                        </div>
                        <form className="user">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control form-control-user"
                              id="exampleInputEmail"
                              aria-describedby="emailHelp"
                              name="email"
                              value={user.email}
                              placeholder="Please Enter Your EmailId"
                              onChange={handleChange}
                            />
                            <p style={{ color: "red" }}>{error.emailError}</p>

                          </div>

                          <div className="form-group">
                            <input
                              type="password"
                              className="form-control form-control-user"
                              id="exampleInputPassword"
                              placeholder="Please Enter Your Password"
                              name="password"
                              value={user.password}
                              onChange={handleChange}
                            />
                            <p style={{ color: "red" }}>{error.passwordError}</p>

                          </div>

                          <button type='button' className="btn btn-primary btn-user btn-block" onClick={onlogin}>
                            Login
                          </button>
                          <hr />
                        </form>

                        <div className="text-center">
                          <Link className="small" to="#">Forgot Password?</Link>
                        </div>
                        <div className="text-center">
                          <Link className="small" to="/SignUp">Create an Account!</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
        <script src="vendor/jquery/jquery.min.js"></script>
        <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="vendor/jquery-easing/jquery.easing.min.js"></script>
        <script src="js/sb-admin-2.min.js"></script>

      </body>
      
    </div>

  );

  function Navji() {
    const [openNavSecond, setOpenNavSecond] = useState(false);
  
    return (
      <MDBNavbar expand='lg' light bgColor='light'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='/'>Home</MDBNavbarBrand>
          <MDBNavbarToggler
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setOpenNavSecond(!openNavSecond)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse navbar open={openNavSecond}>
            <MDBNavbarNav>
              <MDBNavbarLink href='/About'>About</MDBNavbarLink>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    );
  }
}

export default Login;