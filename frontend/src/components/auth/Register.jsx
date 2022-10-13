import {RegisterUser} from "./services/AuthServices";
import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import Login from "./Login";

export default function Register(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate();

    async function submit(event){
        try{
            event.preventDefault();
            const userData={
                email:email,
                password:password
            }
            await RegisterUser(userData)
            navigate("/Login")
            console.log(userData)
            toast.success("User Registered")
            let loog=toast("Now log in to continue")
            setTimeout(loog, 2000)

        }catch(error){
            console.log(error)
        }
    }

    return(<>
            <div className="container-fluid bg-dark text-light">
                <div className="row justify-content-center">
                    <div className="col-sm-10 col-md-8 col-lg-6">
                        <h1 className="m-2">Register User</h1>
                        <form onSubmit={submit}>
                        <div className="input-group m-2">
                            <label className="input-group-text"  htmlFor="email">Email</label>
                            <input type="email" onChange={(event)=>setEmail(event.target.value)} id="email" placeholder="Enter you email address" className="form-control" />
                        </div>
                        <div className="input-group m-2">
                            <label htmlFor="password" className="input-group-text">Password</label>
                            <input type="password" onChange={(event)=>setPassword(event.target.value)} minLength={8} id="password" placeholder="Create Password" className="form-control" />
                            
                        </div>
                        <div className="m-2">
                            <button type="submit" className="btn btn-outline-primary m-2" >Sumbit</button>
                            <button type="reset" className="btn btn-outline-danger m-2"  >Reset</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
            
           
    </>)

    
}