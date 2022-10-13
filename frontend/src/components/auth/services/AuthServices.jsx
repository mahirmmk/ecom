import axios from "axios";
import jwtDecode from "jwt-decode";
const API_URL="http://localhost:3003/auth";
const Config={ 
    headers: { Authorization: `Bearer ${localStorage.getItem("_token")}` }
}

function RegisterUser(data){
    return axios.post(`${API_URL}/signUp`, data)
}
function LogInUser(data){
    return axios.post(`${API_URL}/logIn`, data)
}

function isLoggedIn(){
    const data=localStorage.getItem("_token")
    return (data)? true:false;
}
function getUser(){
    try{
        let decodeToken=jwtDecode(localStorage.getItem("_token"))        
        return decodeToken        
    }catch(event){
        console.log(event)
    }
}
function isAdmind(){
    return !getUser()?false: getUser().role;
}

function logOut(){
    localStorage.removeItem("_token");
    window.location("/")
}
function getAllUsers(){
    return axios.get(`${API_URL}/allUsers`, Config)
}







export {Config, RegisterUser, LogInUser, isLoggedIn, getUser, isAdmind, logOut, getAllUsers}