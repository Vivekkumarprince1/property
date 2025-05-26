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
     MDBCol,
     MDBBtn,
  } from 'mdb-react-ui-kit';


export default function Pnotifications() {
  const [mylist, setMylist] = useState([]);
  const [providername, setProvidername] = useState([]);
  const [openBasic, setOpenBasic] = useState(false);
  const [startdate, setStartdate] = useState();
  const [enddate, setEnddate] = useState();

  useEffect(() => {
    const providername = localStorage.getItem('providername');
    if (providername) {
     setProvidername(providername);
    }
       
          const pname = providername;
    Axios.get(`http://localhost:8000/Pnotifications/${pname}`).then(
        res=> setMylist(res.data));
    
},[]);


const onDelete = (e) => {
  const pid = e.target.value;
  const name = e.target.id;
  let data={"name":name}
  alert(pid);
  Axios.get(`http://localhost:8000/deletenotification/${pid}`,data).then(res => {
     setMylist(res.data);
   });
};

const handlechange1 =(e)=>
  {
    setStartdate(e.target.value);
  }

const handlechange2 =(e)=>
    { 
      setEnddate(e.target.value);
    }  

const Search =()=>
  {
    alert(startdate)
    alert(enddate)
    console.log(startdate)
    const data = mylist.filter((item)=>item.date>=startdate&&item.date<=enddate);
    console.log(data);
    setMylist(data);
  }

  return(
    <div>

     
<Container>
<br/>
<Navji/>
<br/>

<MDBNavbar expand='lg' light bgColor='light' style={{paddingLeft:"400px",paddingRight:"400px"}}>
      <MDBContainer fluid>

        <MDBCollapse navbar open={openBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>

            <MDBNavbarItem> 
            <input type="date" onChange={handlechange1} style={{padding:"20px"}} />
          </MDBNavbarItem>

            <MDBNavbarItem>
            <input type="date" onChange={handlechange2} style={{padding:"20px"}} />
            </MDBNavbarItem>
            
            <MDBNavbarItem style={{padding:"20px"}}>
          <MDBBtn color='primary' onClick={Search}>Search</MDBBtn>
          </MDBNavbarItem>
          </MDBNavbarNav>
          
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>

<Table striped bordered hover> 
<thead>
<th>Date</th><th> Name </th><th>Contact No.</th><th>Email</th><th>P_ID</th><th>Size of Plot</th><th>Location</th><th>Image</th><th>price</th><th>Delete</th>
            
</thead>
<tbody>
                {mylist.length>0 && mylist.map((item,index)=>{
                    return(
                        <tr key={index} >
                            <td>{item.date}</td>
                            <td >{item.name}</td>
                            <td>{item.phone}</td>
                            <td>{item.email}</td>
                            <td>{item.pid}</td>
                            <td>{item.demo[0].size}</td>
                            <td>{item.demo[0].location}</td>
                            <td><img src={item.demo[0].image} style={{ width: 100, height: 100 }} alt='' /></td>
                            <td>{item.demo[0].price}</td>
                            <td><Button
                      variant="danger"
                      id={item.name}
                      value={item.pid}
                      onClick={onDelete}
                    >
                      Delete
                    </Button></td>
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
              <h3 style={{textAlign:"left"}}>Notifications</h3>
            </MDBContainer>
          </MDBNavbar>
        );
      }
}