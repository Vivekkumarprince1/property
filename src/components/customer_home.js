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

function Customer_home()
{
    const [mylist, setMylist] = useState([]);
    const [myliked, setMyliked] = useState([]);
    const [customername, setCustomername] = useState([]);
    

    
    useEffect(() => {
    
        Axios.get("http://localhost:8000/products").then(
            res=> setMylist(res.data) );

      const customername = localStorage.getItem('customername');
            if (customername) {
             setCustomername(customername);
            }
                 const cname=customername
            Axios.get(`http://localhost:8000/likeds/${cname}`).then(
              res=> setMyliked(res.data) );
    },[]);

        const  liked = (e) =>
            {
        const pid=e.target.value;
        let data = {"cname": customername}
                alert(pid);
                Axios.post(`http://localhost:8000/addliked/${pid}`,data).then(res =>  alert("added to liked") );
                
          }
        
return( 
 <>  
<Navji/>
<Container>
<div className="row gy-5" >
<form>
                <div className="row gy-5 menu-item ">

                    {mylist.length>0 && mylist.map((item,index) => {
                        return (
                            
                                <ul key={index} className="col-lg-4 menu-item img-design" >
                                    <li value={item.image} ><img src={item.image} style={{ width: 200, height: 200 }} alt='' /></li>
                                    <span value={item.name} >{item.name}</span>
                                    <li className='ingredients' value={item.size} >{item.size}</li>
                                    <li className='ingredients' value={item.location} >{item.location}</li>
                                    <li className='price' value={item.price} >$&nbsp;{item.price}</li>
                                    <li className='phone' value={item.phone} >&#128222;&nbsp;{item.phone}</li>
                                    <br />
                                    <li><Button onClick={liked} id={item.pid} value={item.pid} size="Medium" className="btn-book-a-table">Add to Favourite</Button></li>

                                </ul>
                        )
                    })}
                    

                </div>
                </form>
            </div>

</Container>


    
</>   
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
          <MDBNavbarLink active aria-current='page' href='/liked' style={{textAlign:"left"}}>
               <h1><var> &#x2764;<sup>{myliked.length}</sup></var></h1>
              </MDBNavbarLink>
              &nbsp;&nbsp;&nbsp;
          <h3 style={{textAlign:"left"}}>Hii {customername}</h3>
        </MDBContainer>
      </MDBNavbar>
    );
  }
}


export default Customer_home;