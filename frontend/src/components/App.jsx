import React, { useState } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar1 from './partials/Navbar1';
import Home from './product/Home/Home';
import AddProduct from './product/AddProduct';
import ListProduct from './product/ListProduct';
import EditProduct from './product/EditProduct';
import toast, { Toaster } from 'react-hot-toast';
import Register from './auth/Register';
import Login from './auth/Login';
import GuestHome from './product/Home/GuestHome';
import AllUsers from './auth/AllUsers';
import { Config, isAdmind, isLoggedIn } from './auth/services/AuthServices';
import Footer from './partials/Footer';
import Cart from './product/Cart';
import { MyContext } from './context/Mycontext';
import { useEffect } from 'react';
import axios from 'axios';

function ProtectedRoute ( {children}){
  const check=isLoggedIn();
  return check? children: <Navigate to={"/"}/>;
}
function AdminRoutes ({children}){
  
  return (isLoggedIn() && isAdmind()=="admin")?children :<Navigate to={"/"}/>;
}




function App() { 
  const [count, setCount]=useState(0);
  useEffect(()=>{
    axios.post("http://localhost:3003/cart/totalCart", {}, Config).then((success)=>{
      setCount(success.data.count)
    })
  }, [])

  const dispatchCart= (action, payload)=>{
    switch(action){
      case "addToCart":
        setCount(payload)
        return;
      case "removeFromCart":
        setCount(payload)
        return;
    }
  }
  
  return (<>
    <MyContext.Provider value={{count, dispatchCart}}>
    <BrowserRouter>
    <Navbar1/>
    <Routes>
      <Route path='/' element={<GuestHome/>} />
      <Route path='/Home' element={<ProtectedRoute><Home/></ProtectedRoute> } />
      <Route path='/ListProduct' element={<ProtectedRoute><ListProduct/></ProtectedRoute> } />
      <Route path='/AddProduct' element={<ProtectedRoute><AddProduct/></ProtectedRoute> } />
      <Route path='/EditProduct/:id' element={<ProtectedRoute><EditProduct/></ProtectedRoute> } />
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/allusers' element={<AdminRoutes><AllUsers/></AdminRoutes> }></Route>
      <Route path='/cart' element={<ProtectedRoute><Cart/></ProtectedRoute> }></Route>

    </Routes>
    
    {
      isLoggedIn() &&
      <Footer/>
    }
    </BrowserRouter>
    </MyContext.Provider>
    <Toaster
     position="top-center"
     reverseOrder={true}
    />

  </>)
}



export default App;
