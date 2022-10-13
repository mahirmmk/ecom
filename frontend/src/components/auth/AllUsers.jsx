import { getAllUsers } from "./services/AuthServices";
import { useState } from "react";
import { useEffect } from "react";


export default function AllUsers () {
    const [user, setUser]=useState([])
    useEffect(()=>{ userData() }, [])

    const userData= async ()=>{
        try{
        
            let userdata= await getAllUsers();
            // console.log(userdata.data.allUsersData);
            setUser([...userdata.data.allUsersData])            

        }catch(err){
            console.log(err)
        }
    }
  
    return(<>
        <div className="container-fluid">
            
                <div className="table-responsive">

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                user.map((element, index)=>{
                                    return <>
                                    <tr key={index} >
                                        <td>{index+1}</td>
                                        <td>{element.email}</td>
                                        <td>{element.password}</td>
                                        <td>{element.role}</td>
                                    </tr>
                                    </>
                                })
                            }

                        </tbody>
                    </table>
                </div>
            
        </div>
    </>)
}

