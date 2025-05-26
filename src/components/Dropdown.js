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


export default function Dropdown() {
  const [mylist, setMylist] = useState([]);
  const [myliked, setMyliked] = useState([]);
  const [size, setSize] = useState();
  const [location, setLocation] = useState();
  const [price, setPrice] = useState();
  const [phone, setPhone] = useState();
  const [pid, setPid] = useState();
  const [image, setImage] = useState();
  const [providername, setProvidername] = useState([]);

  useEffect(() => {
    
    Axios.get("http://localhost:8000/products").then(
        res=> setMylist(res.data) );

    const providername = localStorage.getItem('providername');
        if (providername) {
         setProvidername(providername);
        }
        const pname = providername;
    Axios.get(`http://localhost:8000/Pnotifications/${pname}`).then(
        res=> setMyliked(res.data) );
    
},[]);

const  demo1 = (e) =>
{
    setSize(e.target.value)
        
}
const  demo2 = (e) =>
{
    setLocation(e.target.value)
            
}
const  demo3 = (e) =>
{
    setPrice(e.target.value)
                
}
const  demo4 = (e) =>
    {
      setPhone(e.target.value)
                    
    }

const demo6=(e) =>
  { 
    setImage(e.target.files[0]); 
  }

const onDelete = (e) => {
          const pid = e.target.value;
          alert(pid);
          Axios.get(`http://localhost:8000/deleteproperty/${pid}`).then(res => {
             setMylist(res.data);
           });
        };

const  mysubmit = (e) =>
    {
      const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
      console.log(pid);
        let data = {"name":providername,"size":size,"location":location,"price":price,"phone":phone,"image":image}
        Axios.post("http://localhost:8000/addproperty",data,config).then(res => {
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
<td>Size of Plot: <input type="text" id="size" onChange={demo1} value={size}  /></td>
<td>Location: <input type="text" id="location" onChange={demo2} value={location}/></td>
<td>Price: <input type="text" id="price" onChange={demo3} value={price}  /></td>
<td>Enter Phone No.: <input type="text" id="phone" onChange={demo4} value={phone}  /></td>
<td><Form.Group className="mb-3" controlId="p4">
    <Form.Label>Product Image</Form.Label>
   <Form.Control type="file"  name="image" onChange={demo6} />
    
  </Form.Group></td>
<td><Button variant="success" onClick={mysubmit}>Add</Button></td>
 </tr> 
 </Table>    
</form>



<Table striped bordered hover> 
<thead>
<th> Pid </th> <th> Size </th><th> Location </th><th> Price </th><th>Contact No.</th><th>Image</th>
            
</thead>
<tbody>
                {mylist.length>0 && mylist.map((item,index)=>{
                    if(item.name==providername){
                    return(

                        <tr key={index}>
                            <td >{item.pid}</td>
                            <td>{item.size}</td>
                            <td>{item.location}</td>
                            <td>{item.price}</td>
                            <td>{item.phone}</td>
                            <td><img src={item.image} width="100" height="100" /></td>
                            <td><Button
                      variant="danger"
                      id={item.pid}
                      value={item.pid}
                      onClick={onDelete}
                    >
                      Delete
                    </Button>
                            </td>
                            </tr>
                );}
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
              <MDBNavbarLink active aria-current='page' href='/Pnotifications' style={{textAlign:"left"}}>
               <h1><var> &#128276;<sup>{myliked.length}</sup></var></h1>
              </MDBNavbarLink>
              &nbsp;&nbsp;&nbsp;
              <h3 style={{textAlign:"left"}}>Hii {providername}</h3>
            </MDBContainer>
          </MDBNavbar>
        );
      }
}