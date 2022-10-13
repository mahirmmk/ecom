import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Home from "./Home/Home";
import toast, { Toaster } from 'react-hot-toast';
import { Config } from "../auth/services/AuthServices";

export default function EditProduct () {
    const navigate=useNavigate();
    const {id}=useParams("id");
    const[product, setProduct]=useState({});
    async function getProduct(){
        axios.get(`http://localhost:3003/product/editProduct/${id}`, Config).then(res=>{
            setProduct(res.data)            
        }).catch(err=>console.log(err))
    }
    getProduct();

    function submitFunction(event){
        event.preventDefault();
        let product={
            title:event.target.title.value,
            price:event.target.price.value,
            cat:event.target.cat.value,
            desc:event.target.desc.value,
            image:event.target.image.value
        }
        axios.patch(`http://localhost:3003/product/patchProduct/${id}`, product, Config).then(res=>{
            console.log(res)
        }).catch(err=>console.log(err))
        navigate("/Home")
        toast.success("Product updated succesfully")
        
    }
    
    
    return(<>
            <div className="container  " style={{background:"darkgrey"}}>
            <h1> Edit Product</h1>
            <div className="row p-4 ">
                <div className="col-md-6 ">
                <form onSubmit={submitFunction} >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Product Title</Form.Label>
        <input className="form-control" type="text" placeholder="Enter Title" name="title" defaultValue={product.title} />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Product Category</Form.Label>
        <input className="form-control" type="text" placeholder="Category" name="cat" defaultValue={product.cat}  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Product Price</Form.Label>
        <input className="form-control" type="number" placeholder="Enter Price" name="price" defaultValue={product.price}  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Image</Form.Label>
        <input className="form-control" type="text" placeholder="Enter image url" name="image" defaultValue={product.image} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Description</Form.Label>
        <input className="form-control" as="textarea" placeholder="Detailed description" name="desc" defaultValue={product.desc}/>
      </Form.Group>
      
      
      <input className="btn btn-primary me-2" type="submit" value={"Submit"} />
      <Button variant="danger" type="reset">
        Reset
      </Button>
    </form>
                </div>
            </div>
        </div>
        <Toaster/>
        </>)
}