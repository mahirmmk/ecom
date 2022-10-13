/*
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
import { Config } from "../auth/services/AuthServices";
import DataTable from "react-data-table-component";

export default function ListProduct (){
    const [products,setProducts]=useState([])
    const navigate=useNavigate()
   
    useEffect(()=>{
        getProducts();
    }, [])

    const columns=[
        {
            name:"No.",
            selector:row=>row.index+1,
            sortable:true
        },
        {
            name:"Image",
            selector:row=>row.image,
            sortable:true
        },
        {
            name:"Title",
            selector:row=>row.title,
            sortable:true
        },
        {
            name:"Category",
            selector:row=>row.cat,
            sortable:true
        },
        {
            name:"Price",
            selector:row=>row.price,
            sortable:true
        },
        {
            name:"Description",
            selector:row=>row.desc,
            sortable:true
        },
    ]


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

    



    return (<>

        <div className="table-responsive  ">
        <table className="table table-striped">
    <thead>
        <tr>
            <th>No</th>
            <th>Image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Description</th>
            <th>Action</th>
            
        </tr>
    </thead>
    <tbody>
            {
                products.map((element, index)=>(
                    <tr key={index} >
                        <td>{index+1}</td>
                        <td > <a href={element.image} target="_blank"> <img height="250px" src={element.image} alt="" /></a> </td>
                        <td>{element.title}</td>
                        <td>{element.price}</td>
                        <td>{element.cat}</td>                        
                        <td>{element.desc}</td>
                        <td>  <button onClick={()=>deleteProduct(element._id)} className="btn btn-danger me-2"> Remove</button>
                        <Link  className="btn btn-secondary   mt-2 mt-lg-0"  to={`/editProduct/${element._id}`}> Edit</Link>
                        </td>
                    </tr>
                ))
            }
        
        
        
    </tbody>
</table>
        </div>
       
    </>)
}*/