import {Form,Button,Container,Table} from 'react-bootstrap';
import Axios from "axios";
import React, { useState,useEffect } from "react";
import {useNavigate} from 'react-router-dom';

import {
  MDBCarousel, MDBCarouselItem, MDBCarouselCaption,
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBIcon,
  MDBCollapse,
  MDBBtn,
} from 'mdb-react-ui-kit';


function Home(){
  const [mylist, setMylist] = useState([]);
  const [list, setList] = useState([]);
  const [customername, setCustomername] = useState([]);
  const [city, setCity] = useState();
  const [minprice, setMinprice] = useState();
  const [ok, setOk] = useState([]);
  const [openBasic, setOpenBasic] = useState(false);
  
  const navigate = useNavigate();
  
  useEffect(() => {
  
      Axios.get("http://localhost:8000/products").then(
          res=> setMylist(res.data) );   
  },[]);

  const  login = () =>
    {
  alert("Please Login first");
  navigate("/login")
        
  }  
 

    const  okji = () =>
      {
        Axios.post("http://localhost:8000/okji").then(
          res=> setOk(res.data) );
    console.log(ok);
          
    }    
//   const handleChange =(e)=>
//     {
//   alert(e.target.id);
//   alert(e.target.value);
//   if(e.target.id="cities")
//   {
//     const data = mylist.filter((item)=>item.location===e.target.value)
//     setList( data);
//   }
//  if(e.target.id="price")
//   {
//    const data1 = list.filter((item)=>item.price<=e.target.value)
//    setList( data1);
//   }
//     }  
  
  const handleChange =(e)=>
    {
      setCity(e.target.value)
  alert(e.target.value);
    }

  const handleChange1 =(e)=>
      {
    alert(e.target.value);
    setMinprice(e.target.value)
      }  


  const Search =()=>
        {
          alert(city)
          alert(minprice)
      const data = mylist.filter((item)=>item.price<=minprice&&item.location===city);
     setList( data);
     
     console.log(list);
        } 
  return (
      <div className="App">
  <Okji/>
  <Navji/>
<Carousel/>

    <MDBNavbar expand='lg' light bgColor='light' style={{paddingLeft:"400px",paddingRight:"400px"}}>
      <MDBContainer fluid>

        <MDBCollapse navbar open={openBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>

            <MDBNavbarItem> 
  <div  style={{padding:"30px"}} >
    <select onChange={handleChange}>
    <option >Select City</option>
      <option  value="Kharar" >Kharar</option>
      <option  value="Mohali" >Mohali</option>
      <option  value="Chandigarh" >Chandigarh</option>
      <option  value="Zirakpur" >Zirakpur</option>
      <option  value="Landran">Landran</option>
    </select>
    </div>
          </MDBNavbarItem>

            <MDBNavbarItem>
  <div  style={{padding:"30px"}} >
    <select onChange={handleChange1}>
    <option >Select Under Price</option>
      <option  value="6000000" >Under 60,00,000</option>
      <option  value="7000000" >Under 70,00,000</option>
      <option  value="8000000" >Under 80,00,000</option>
      <option  value="9000000" >Under 90,00,000</option>
    </select>
    </div>
            </MDBNavbarItem>
            
            <MDBNavbarItem style={{padding:"20px"}}>
          <MDBBtn color='primary' onClick={Search}>Search</MDBBtn>
          </MDBNavbarItem>
          <MDBNavbarItem style={{padding:"20px"}}>
          <MDBBtn color='primary' onClick={okji}>Okji</MDBBtn>
          </MDBNavbarItem>
          </MDBNavbarNav>
          
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>

  
<div className="row gy-5" >
    <form>
       <div className="row gy-5 menu-item " style={{padding:"20px", clear:"both"}}>
    
            {list.length>0 && list.map((item,index) => {
           return (
                    <>
                      <ul key={index} className="col-lg-4 menu-item img-design" >
                              <li value={item.image} ><img src={item.image} style={{ width: 200, height: 200 }} alt='' /></li>
                              <li className='ingredients' value={item.size} >{item.size}</li>
                              <li className='ingredients' value={item.location} >{item.location}</li>
                              <li className='price' value={item.price} >$&nbsp;{item.price}</li>
                              <br />
                              <li><Button onClick={login}  size="Medium" className="btn-book-a-table">Add to Favourite</Button></li>
    
                     </ul>
                     </>
                            )
                        })}
                        
    
                    </div>
                    </form>
                </div>
</div>
  );
}

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
            <MDBNavbarLink active aria-current='page' href='/login'>
              Login
            </MDBNavbarLink>
            <MDBNavbarLink href='/About'>About</MDBNavbarLink>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

function Carousel() {
  return (
    <>
    <MDBCarousel showControls showIndicators>
      <MDBCarouselItem itemId={1}>
        <img src='prop1.png' className='d-block w-100' alt='...' style={{height: "600px",width: "1200px"}}/>
        <MDBCarouselCaption>
          <h1>Welcome to Ok Properties Ji</h1>
          <h5>It provides best deals of properties at each and every you call us</h5>
        </MDBCarouselCaption>
      </MDBCarouselItem>
      <MDBCarouselItem itemId={2}>
        <img src='prop2.png' className='d-block w-100' alt='...' style={{height: "600px",width: "1200px"}}/>

        <MDBCarouselCaption>
          <h1>New and Well Designed Properties</h1>
          <h5>New Properties which Are well designed are waiting for you.</h5>
        </MDBCarouselCaption>
      </MDBCarouselItem>
      <MDBCarouselItem itemId={3}>
        <img src='prop3.png' className='d-block w-100' alt='...' style={{height: "600px",width: "1200px"}} />
        <MDBCarouselCaption>
          <h1>Luxurious Properties</h1>
          <h5>Luxurious and well Furnished as a man has demand is provided according to your need.</h5>
        </MDBCarouselCaption>
      </MDBCarouselItem>
    </MDBCarousel>
    </>
  );
}
  
function Okji(){
  <h1 style={{backgroundColor:"#e1e5eb"}}>Ok Properties Ji</h1>
}

export default Home;