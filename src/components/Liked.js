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


export default function Liked() {
  const [mylist, setMylist] = useState([]);
  const [customername, setCustomername] = useState([]);

  useEffect(() => {

    const customername = localStorage.getItem('customername');
        if (customername) {
         setCustomername(customername);
        }

        const cname=customername
   Axios.get(`http://localhost:8000/likeds/${cname}`).then(
              res=> setMylist(res.data) );
},[]);

        


const onUnlike = (e) => {
          const pid = e.target.value;
          alert(pid);
          Axios.get(`http://localhost:8000/unlikeproperty/${pid}`).then(res => {
             setMylist(res.data);
           });
        };

const providernotifiction = (e) => {
          const name = e.target.value;
          const pname = e.target.id;
          const pid = e.target.name;
          let data = {"pname": pname,"pid":pid}
          alert(name);
          Axios.post(`http://localhost:8000/providernotification/${name}`,data).then(res => {
             console.log(res.data);
           });
        };       

  return(
    <div>

     
<Container>
<br/>
<Navji/>
<br/>

<Table striped bordered hover> 
<thead>
<th> Pid </th> <th> Name </th> <th> Size </th><th> Location </th><th> Price </th><th>Contact No.</th><th>Image</th>
            
</thead>
<tbody>
                {mylist.length>0 && mylist.map((item,index)=>{
                    return(
                        <tr key={index}>
                            <td>{item.pid}</td>
                            <td>{item.name}</td>
                            <td>{item.size}</td>
                            <td>{item.location}</td>
                            <td>{item.price}</td>
                            <td>{item.phone}</td>
                            <td><img src={item.image} width="100" height="100" /></td>
                            <td><Button
                      variant="danger"
                      id={item.pid}
                      value={item.pid}
                      onClick={onUnlike}
                    >
                      Unlike
                    </Button>
                            </td>
                            <td><Button
                            variant="success" 
                            id={item.name}
                            value={item.cname}
                            name={item.pid}
                            onClick={providernotifiction}>
                            send a message <br/>to provider</Button></td>
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
              <h3 style={{textAlign:"left"}}>Liked Properties</h3>
            </MDBContainer>
          </MDBNavbar>
        );
      }
}