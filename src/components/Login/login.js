import React, {Component} from "react";
import { Link } from 'react-router-dom';

class Login extends Component {
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
    //endpoint="/reg";
    loginEvent = event => {
        this.setState({error:''})
        const userName=document.getElementById('userName').value;
        const password=document.getElementById('password').value;
        
        if(userName!==''&&password!==''){
            const bodyData=JSON.stringify({
                "username": userName,
                "password": password
            });
            var msg='';
            var request = new XMLHttpRequest();
            request.open('POST', 'http://localhost:9393/authenticate', false);
            request.setRequestHeader('Content-Type','application/json');
            request.onload = function () {
                var data =JSON.parse(this.response);
                var statusCode=request.status;
                var jwt='';
                if(data.jwt!=null){
                    jwt=data.jwt;
                    localStorage.setItem("token", jwt);
                }
                if(statusCode>=200 &&statusCode<400){
                    window.location = "/";
                }
                else{
                    msg='Invalid Email or Password';
                }
            }
            request.send(bodyData);
            this.setState({
                error:msg
            });
        }
        else
            this.setState({error:'All Field Required'});
    }

    render() { 
        return ( 
            <div>
            <main className="container">
                <br/>
                <h1>Login</h1>
                <div className="mb-3">
                    <label className="form-label">User Name</label>
                    <input type="text" required className="form-control" id="userName"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" required className="form-control" id="password"/>
                </div>
                <div >
                <Link onClick={()=>{this.loginEvent()}}>
                <button type="submit" class="btn btn-primary" id="login">Login</button>
                <label style={{color: '#FF0000', padding: '10px'}} >{this.state.error}</label>
                </Link>
                </div>
            </main>
          </div>
         );
    }
}
 
export default Login;