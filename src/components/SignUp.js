import React from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { Form} from 'react-bootstrap';
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function SignUp() {
  const navigate = useNavigate();

  const [form , setForm]= useState({
    email: '', password: '',
    name: '',phone: '',type:''
  });

  const handleform=(e)=>{

    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }

  async function mysubmit() {

    const data = form;

    const config = {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body :JSON.stringify(data)
    }
    const response= await fetch('http://localhost:8000/logins',config)
    const json = await response.json();

    console.log(json);
  }

  function show()
  {
      navigate("/Login")
  }

  return (
    <form style={{paddingLeft : "500px", paddingRight : "500px",paddingTop : "30px",paddingBottom : "30px",backgroundColor:"#e1e5eb"}}>
      <Form.Label>Full Name</Form.Label>
      <MDBInput wrapperClass='mb-4' type='text' name="name" id='form6Example5' onChange={handleform} />
      <Form.Label>Email</Form.Label>
      <MDBInput wrapperClass='mb-4' type='email' name="email" id='form6Example5' onChange={handleform} />
      <Form.Label>Password</Form.Label>
      <MDBInput wrapperClass='mb-4' type='Password' name="password" id='form6Example5' onChange={handleform} />
      <Form.Label>Confirm Password</Form.Label>
      <MDBInput wrapperClass='mb-4' type='text' name="cpassword" id='form6Example5' onChange={handleform} />
      <Form.Label>Phone Number</Form.Label>
      <MDBInput wrapperClass='mb-4' type='tel' name="phone" id='form6Example6' onChange={handleform} />
      <Form.Label>Category</Form.Label>
      <Form.Select  wrapperClass='mb-4' type='text' name="type" id='form6Example5' onChange={handleform} >
                            <option>provider</option>
                            <option>customer</option>
                        </Form.Select>
                        
      
      <MDBCheckbox
        wrapperClass='d-flex justify-content-center mb-4'
        id='form6Example8'
        label='Create an account?'
        defaultChecked
      />

      <MDBBtn className='mb-4' type='submit' block onClick={mysubmit}>
        Sign Up
      </MDBBtn>
      <MDBBtn className='mb-4' type='submit' block onClick={show}>
        Login
      </MDBBtn>
    </form>
  );
}