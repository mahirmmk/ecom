import React from "react";
import { Link } from 'react-router-dom';
import "bootstrap/dist/js/bootstrap.bundle"
import { isAdmind, isLoggedIn, logOut } from "../auth/services/AuthServices";
import {BsCart} from "react-icons/bs"
import { useState, useEffect } from "react";
import axios from "axios";
import {Config} from "../auth/services/AuthServices";
import { MyContext } from "../context/Mycontext";
import { useContext } from "react";






export default function Navbar1 (){ 
  const{count}=useContext(MyContext)
  
    
    
    return(<>
        <nav className="navbar sticky-top navbar-expand-lg navbar-dark " style={{background:"rgba(0, 0, 0, 0.90)"}} >
  <div className="container-fluid">
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">

        {
          !isLoggedIn() && <>
          <Link className="navbar-brand" to="/" >MMKart</Link>
          
          

          </>
        }
        
        {
          isLoggedIn() && <>
          <Link className="navbar-brand" to="/Home" >MMKart</Link>
        <Link className="nav-link active" to="/Home" aria-current="page"  >Home</Link>
        <Link className="nav-link active" to="/ListProduct" aria-current="page"  >Products</Link>
              
        {         
          (isAdmind()=="admin") && <>
            <Link className="nav-link active" to="/AddProduct" aria-current="page"  >Add Product</Link> 
            <Link className="nav-link active" to="/allUsers"  aria-current="page"  >Users</Link>
          </>
        }      

        </>
      }
        
        
        

        
       
        
      </div>
      
      
    </div>
    { !isLoggedIn() &&
      <div className="d-flex">
      <Link className="btn btn-primary me-2  " to="/Register" aria-current="page"  >Register</Link>
      <Link className="btn btn-success me-2 " to="/login" aria-current="page"  >Log In</Link> 
    </div>
    }
    {
      isLoggedIn() &&
      <div className="d-flex">        
        <Link className="btn btn-outline-warning text-light mx-2 position-relative " to="/cart" aria-current="page"  ><BsCart/> Cart
          <span class="position-absolute top-75 start-100 translate-middle badge rounded-pill bg-danger">{count}</span>
          <span class="visually-hidden">unread messages</span>
        </Link>
        <Link className="btn btn-outline-danger text-light me-0 " onClick={logOut} to="/" aria-current="page"  >Log Out</Link>
      </div>
    }
          
  </div>
</nav>
        </>
    )

   
}

