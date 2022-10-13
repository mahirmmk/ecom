import React from "react";
import { useNavigate } from "react-router-dom";
import "./ListProduct.css";
import axios from "axios";
import { useState } from 'react'
import { useEffect } from 'react';
import Home from "./Home/Home";
import EditProduct from "./EditProduct";
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { Config, isAdmind } from "../auth/services/AuthServices";
import DataTable from "react-data-table-component";
import Modal from "../partials/Modal";
import Cart from "./Cart";
import { MyContext } from "../context/Mycontext";
import { useContext } from "react";

export default function ListProduct (){
    const {count, dispatchCart}=useContext(MyContext)

    const [products,setProducts]=useState([])
    
    const navigate=useNavigate()
   
    useEffect(()=>{
        getProducts();
    }, [])
     
    function getProducts (){
        axios.get("http://localhost:3003/product/getProducts").then(response=>{
            
            setProducts(response.data.rdata)
        })
    }

    function deleteProduct (id){
            axios.delete(`http://localhost:3003/product/deleteProduct/${id}`, Config).then(success=>{
            console.log("removed product with id" + id +success )
            getProducts();
        }).catch(err=>console.log(err))
        toast.success('Product deleted', {
            style: {
              border: '1px solid #ff033e',
              padding: '10px',
              color: '#ff033e',
            },
            iconTheme: {
              primary: '#ff033e',
              secondary: '#ffa3a3',
            },
          });
          

        
    }
    const addToCart =async (id, price)=>{
        try{         
            const cartInfo=await axios.post("http://localhost:3003/cart/addtocart", {productId:id, price}, Config);
            getProducts();
            dispatchCart("addToCart", count+1);
            if (cartInfo.data.success){
                toast.success("Product added to Cart")
            }
            
        }catch(error){
            console.log("error in addToCart function"+error)
        }
    }
    const removeFromCart=async (id)=>{
        try{
            await axios.post("http://localhost:3003/cart/removefromcart", {productId:id}, Config)
            getProducts();
            dispatchCart("removeFromCart", count-1)
            toast.error("Item removed from Cart")
        }catch(err){
            console.log(err, "error in removeFromCart")
        }
    }
   





    const columns=[
        {
            name:"Image",
            selector:row=><><a href={row.image} target="_blank" > <img src={row.image} width="200px" /></a></> ,
            sortable:false,
            width: "20%"
        },
        {
            name:"Title",
            selector:row=>row.title,
            sortable:true,
            width: "10%"
        },
        {
            name:"Price",
            selector:row=>row.price,
            sortable:true,
            width: "10%"
        },
        {
            name:"Category",
            selector:row=>row.cat,
            sortable:true,
            width: "10%"
        },
        {
            name:"Description",
            selector:row=>row.desc,
            sortable:false,
            width: "15%"
        },
        { 
            name:"Action",
            selector:row=><> <button className="btn btn-success mx-2" >Add to cart</button>
            <button className="btn btn-danger" onClick={(event)=>{deleteProduct(row._id)}} >Delete Product</button>
              </>,
            sortable:false
        }
    ]

    const columns2=[
        {
            name:"Image",
            selector:row=><><a href={row.image} target="_blank" > <img src={row.image} width="200px" /></a></> ,
            sortable:false,
            width: "20%"
        },
        {
            name:"Title",
            selector:row=>row.title,
            sortable:true,
            width: "10%"
        },
        {
            name:"Price",
            selector:row=>row.price,
            sortable:true,
            width: "10%"
        },
        {
            name:"Category",
            selector:row=>row.cat,
            sortable:true,
            width: "10%"
        },
        {
            name:"Description",
            selector:row=>row.desc,
            sortable:false,
            width: "15%"
        },
        { 
            name:"Action",
            selector:row=><> <button className="btn btn-success my-2" onClick={(e)=>{(row.isAddedToCart)?removeFromCart(row._id):addToCart(row._id, row.price)}} >{(row.isAddedToCart)?"Remove from Cart":"Add to Cart"} </button>   </>,
            sortable:false
        }
    ]
    

   
    

    return (<>
        {
            isAdmind()==="admin" &&
            <DataTable columns={columns} data={products}> pagination=true paginationPerPage={"5"}  </DataTable>
        }
        {
            !(isAdmind()==="admin") &&
            <DataTable columns={columns2} data={products}> pagination=true paginationPerPage={"5"}  </DataTable>
        }       
    </>)
}