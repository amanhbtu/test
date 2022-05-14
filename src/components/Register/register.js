import React from "react";
import { Link } from "react-router-dom";

class Register extends React.Component {
    constructor(){
        super();
        const token = localStorage.getItem("token");
        if(token!==null){
        window.location="/";
        }
        this.state = { 
            error:''
        }
    }
    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    registerEvent(){
        this.setState({error:''})
        const userName=document.getElementById('userName').value;
        const name=document.getElementById('name').value;
        const password=document.getElementById('password').value;
        const email=document.getElementById('email').value;
        if(userName!==''&&password!==''&&email!==''&&name!==''){
            if(this.validateEmail(email)){
                const bodyData=JSON.stringify({
                    "username": userName,
                    "name": name,
                    "email": email,
                    "password": password
                });
                var msg='';
                var request = new XMLHttpRequest();
                request.open('POST', 'http://localhost:9393/user/register', false);
                request.setRequestHeader('Content-Type','application/json');
                request.onload = function () {
                    var data =JSON.parse(this.response);
                    var statusCode=request.status;
                    if(statusCode===200){
                        window.location = "/login";
                    }
                    else{
                        msg='Registration Unsuccesfull with Status Code: '+statusCode+' and Response: '+JSON.stringify(data);
                    }
                }
                request.send(bodyData);
                this.setState({
                    error:msg
                });
            }
            else{
                this.setState({error:'Invalid Email Address'});
            }
        }
        else
            this.setState({error:'All Field Required'});
    }

    render() { 
        return (
            <div>
            <main className="container">
            <br/>
            <h1 >Register</h1>
            <div className="mb-3">
                   <label className="form-label">User Name</label>
                   <input type="text" required className="form-control" id="userName"/>
               </div>
               <div className="mb-3">
                   <label className="form-label">Name</label>
                   <input type="text" required className="form-control" id="name"/>
               </div>
               <div className="mb-3">
                   <label className="form-label">Password</label>
                   <input type="password" required className="form-control" id="password"/>
               </div>
               <div className="mb-3">
                   <label className="form-label">Email</label>
                   <input type="email" required className="form-control" id="email" />
               </div>
               <Link>
               <button type="submit" onClick={()=>{this.registerEvent()}} class="btn btn-primary" id="registerUser">Register</button>
               <label style={{color: '#FF0000', padding: '10px'}} >{this.state.error}</label>
               </Link>
            </main>
          </div>
          );
    }
}
 
export default Register;