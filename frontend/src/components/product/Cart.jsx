import { useState, useEffect } from "react";
import axios from "axios";
import {Config} from "../auth/services/AuthServices";

export default function Cart(props){
    const [cart, setCart]=useState([]);
    const [total, setTotal]=useState(0);

    useEffect(()=>{
        getCartItems()
    }, []);

    const getCartItems= async ()=>{
        const cartData=await axios.get(`http://localhost:3003/cart/getcart`, Config);
        setCart([...cartData.data.cart])
        totalPrice(cartData.data.cart)
    }
    const totalPrice=async (data)=>{
        let sum=0;
        data.forEach(element => {
            sum+=element.price*element.quantity
        });
        setTotal(sum)        
    }
return <>
        <div className="container">
            <div className="row table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Image</td>
                            <td>Quantity</td>
                            <td>Price</td>
                            <td>User</td>
                            <td>Time</td>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                cart.map((element, index)=>(
                                    <tr key={index}>
                                        <td>{element.productId.title}</td>
                                        <td>{<a href={element.productId.image} target="_blank" > <img src={element.productId.image} height="100px" /></a>}</td>
                                        <td>{element.quantity}</td>
                                        <td>{element.productId.price}</td>
                                        <td>{element.userId.email}</td>
                                        <td>{element.createdAt}</td>

                                    </tr>
                                ))
                            }
                    </tbody>
                    
                </table>  
                
            </div>
            <div className="row justify-content-end my-3 border">
                <div className="col-auto bg-secondary text-light">
                    Total Price
                </div>
                <div className="col-auto bg-dark text-light">
                    {total+".00"}
                </div>
            </div>
        </div>

</>
}