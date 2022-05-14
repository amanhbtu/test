import React , {Component} from 'react';
import img from './logout.png'

class Logout extends Component {
    state = {  }
    constructor(){
        super();
        const token = localStorage.getItem("token");
        if(token!==null){
        window.location="/";
        }
    }
    render() { 
        return (
            <div>
            <main style={{marginTop:'100px'}} className="container">
                <center>
                <h3>You Have Successfully Logout</h3>
                <img style={{margin:'50px'}} src={img}/>
                <h4>Go to <a href='/login' >Login</a></h4>
                </center>       
            </main>
            </div>
          );
    }
}
 
export default Logout;