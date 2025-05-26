import React, { useState,useEffect } from "react";
import Axios from "axios";
import {Form,Button,Container,Table} from 'react-bootstrap';
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


export default function Admin_home() {
  const [mylist, setMylist] = useState([]);
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [type, setType] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    
    Axios.get("http://localhost:8000/list").then(
        res=> setMylist(res.data) );
 



},[]);

const  demo = (e) =>
{
    setName(e.target.value)
    
}
const  demo1 = (e) =>
{
    setPhone(e.target.value)
        
}
const  demo2 = (e) =>
{
    setEmail(e.target.value)
            
}
const  demo3 = (e) =>
{
    setType(e.target.value)
                
}
const  demo4 = (e) =>
    {
        setPassword(e.target.value)
                    
    }

const  onDelete = (e) =>
        {
          const email=e.target.value;
            console.log(email);
            Axios.get(`http://localhost:8000/delete/${email}`).then(res => {
                setMylist(res.data) });
            
        
        }
const  onEdit = (e) =>
    {
      const email=e.target.value;
        console.log(email);
        Axios.get(`http://localhost:8000/edit/${email}`).then(res => {
            console.log(res.data);
            setName(res.data[0].name);
            setPhone(res.data[0].phone);
            setEmail(res.data[0].email);
            setType(res.data[0].type);
            setPassword(res.data[0].password);
          
        });
                   
    }
const  mysubmit = (e) =>
    {
        let data = {"name":name,"phone":phone,"email":email,"type":type,"password":password}
        Axios.post("http://localhost:8000/addemployee",data).then(res => {
          setMylist(res.data);
        });
            
    }
    const  myupdate = (e) =>
        {
            let data = {"name":name,"phone":phone,"email":email,"type":type,"password":password}
            Axios.post("http://localhost:8000/update",data).then(res => {
              setMylist(res.data);
            });
                
        }
  return(
    <div>
    

     
<Container>
<br/>
<Navji/>
<br/>
<form >
<Table striped bordered hover>
<tr> 
<td>Enter Name: <input type="text" id="name" onChange={demo} value={name}/></td>
<td>Enter Phone No.: <input type="text" id="phone" onChange={demo1} value={phone}  /></td>
<td>Enter Email: <input type="text" id="email" onChange={demo2} value={email}/></td>
<td>Enter Type: <input type="text" id="type" onChange={demo3} value={type}  /></td>
<td>Enter Password: <input type="text" id="password" onChange={demo4} value={password}  /></td>

<td><Button variant="success" onClick={mysubmit}>Add</Button></td>
<td><Button variant="success" onClick={myupdate}>Update</Button></td>
 </tr> 
 </Table>    
</form>



<Table striped bordered hover> 
<thead>
<th> Email </th> <th> Name </th> <th> Phone </th><th> Type </th><th> Password </th><th>Delete</th><th>Edit</th>
            
</thead>
<tbody>
                {mylist.length>0 && mylist.map((item,index)=>{
                    
                    return(
                        <tr key={index}>
                            <td>{item.email}</td>
                            <td>{item.name}</td>
                            <td>{item.phone}</td>
                            <td>{item.type}</td>
                            <td>{item.password}</td>
                            <td><Button
                      variant="danger"
                      id={item.email}
                      value={item.email}
                      onClick={onDelete}
                    >
                      Delete
                    </Button>
                            </td>

                            <td><Button
                      variant="success"
                      value={item.email}
                      id={item.email}
                      onClick={onEdit}
                    >
                      Edit
                    </Button>
                            </td>


                        </tr>



                            
                    );
                })}

                
            </tbody>
</Table>
</Container>

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
                  <MDBNavbarLink active aria-current='page' href='/login'>
                Log Out
              </MDBNavbarLink>
              
                </MDBNavbarNav>
              </MDBCollapse>
              <h3 style={{textAlign:"left"}}>Hii ADMIN</h3>
            </MDBContainer>
          </MDBNavbar>
        );
      }
}