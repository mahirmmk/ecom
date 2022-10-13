import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import { useState } from 'react'
import { useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";


export default function Home (){
    const [data,setProducts]=useState([])
   
    useEffect(()=>{
        getData();
    }, [])

    function getData (){
        axios.get("http://localhost:3003/product/getProducts").then(response=>{            
            setProducts(response.data.rdata)            
        })
    }
    return (<> 
      <div className="container " >
      <div className="row justify-content-center " >
        {
          data.map(element=>(
            
            <div key={element._id} className="col-md-3 m-3">
              <Card  style={{ width: '', height:"auto" }}>
                <Card.Img variant="top" height={"200px"} src={element.image} />
                <Card.Body>
                  <Card.Title>{element.title}</Card.Title>
                  <Card.Text>
                    {element.desc}
                  </Card.Text>
                  <Button variant="primary">Buy Now</Button>
                </Card.Body>
              </Card>
            </div>
            
          ))
        }
             
      
      
             </div>
      </div></>

    )
}

