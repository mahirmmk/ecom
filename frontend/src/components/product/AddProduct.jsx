import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { Config } from "../auth/services/AuthServices";
import "./AddProduct.css"

 
export default function AddProduct (){

  const [title, setTitle] = useState('');
  const [cat, setCat] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [desc, setDesc] = useState('');

  function submitFunc (event){
    event.preventDefault();
    
    let product={
      title:title,
      cat:cat,
      price:price,
      image:image,
      desc:desc
    }
    let newProduct= new FormData();
    

    newProduct.append('title', title)
    newProduct.append('cat', cat)
    newProduct.append('desc', desc)
    newProduct.append('price', price)
    newProduct.append('image', image)
    

    axios.post("http://localhost:3003/product/postProduct", newProduct , Config).then(data=>{
      console.log(data.data, Config)

    }).catch(err=>console.log(err))
    event.target.reset();
    toast.success("Product added")

    
  }
    return( <>
        <div className="container addPro  " >
            <h1> Add Product</h1>
            <div className="row p-4 ">
                <div className="col-md-6 transaddpro ">
                <Form onSubmit={submitFunc}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Product Title</Form.Label>
        <Form.Control type="text" placeholder="Enter Title" onChange={(event)=> setTitle(event.target.value) } />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Product Category</Form.Label>
        <Form.Control type="text" placeholder="Category" onChange={(event)=> setCat(event.target.value) } />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Product Price</Form.Label>
        <Form.Control type="number" placeholder="Enter Price" onChange={(event)=> setPrice(event.target.value) } />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Image</Form.Label>
        <Form.Control type="file" name="file"  onChange={(event)=> setImage(event.target.files[0]) } />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" placeholder="Detailed description" onChange={(event)=> setDesc(event.target.value) } />
      </Form.Group>
      
      
      <Button variant="primary" className="me-2" type="submit">
        Submit
      </Button>
      <Button variant="danger" type="reset">
        Reset
      </Button>
    </Form>
                </div>
            </div>
        </div>
    </>)
}