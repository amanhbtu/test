import React, {Component} from "react";
import img from './user.png';
import  "./User.css";

class User extends Component {

    constructor(){
        super();
        this.state = { 
            edit:true,
            error:'',
            selectedFile: null
        }
        const token = localStorage.getItem("token");
        if(token===null){
        window.location="/login";
        }
    }

    fileChangedHandler = event => {
        this.setState({ selectedFile: event.target.files[0] });
    }

    uploadHandler = () => {
        var con=window.confirm('Are you sure upload');
        if(con){
            var xhr = new XMLHttpRequest();
            var formData = new FormData();
            formData.append("image", this.state.selectedFile);

            xhr.open('POST', 'http://localhost:9393/user/profile-image', false);
            xhr.setRequestHeader('Authorization','Bearer '+localStorage.getItem("token"));
            xhr.send(formData);
            if(xhr.status==403){
                localStorage.removeItem("token");
                window.location = "/login";
            }
            if(xhr.status==200){
                document.getElementById('profileImg').src=document.getElementById('fileUpload').value;
            }

        
        }
    }

    componentDidMount(){
        if(this.state.edit){
            this.getUserInfo();
        }
    }

    edit(opt){
        if(opt==='c'||opt==='e'){
            this.setState({edit:!this.state.edit,error:''});
        }
        if(opt==='u')
            this.putUserInfo();
    }

    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    componentDidUpdate(){
        if(this.state.edit){
            document.getElementById('email').value=this.state.email;
            document.getElementById('name').value=this.state.name;
        }
    }
    putUserInfo(){
        var userId=this.state.userId;
        var userName=this.state.username;
        var name=document.getElementById('name').value;
        var picture=this.state.picture;
        var password=document.getElementById('password').value;
        var email=document.getElementById('email').value;
        if(password!==''&&email!==''&&name!==''){
            if(this.validateEmail(email)){
                const bodyData=JSON.stringify({
                    "userId":userId,
                    "username": userName,
                    "name": name,
                    "email": email,
                    "password": password
                });
    
                var msg='';
                var request = new XMLHttpRequest();
                request.open('PUT', 'http://localhost:9393/user/', false);
                request.setRequestHeader('Content-Type','application/json');
                request.setRequestHeader('Authorization','Bearer '+localStorage.getItem("token"));
                request.onload = function () {
                    var data =JSON.parse(this.response);
                }
                request.send(bodyData);
                var statusCode=request.status;
                    if(statusCode===200){
                       alert('Update Succesfull');
                       this.getUserInfo();
                    }
                    else{
                        alert('Update Unsuccesfull');
                        msg='Update Unsuccesfull';
                    }
                this.setState({
                    error:msg
                });
            }
            else
                this.setState({error: 'Invalid Email Address'});
            
        }
        else
            this.setState({error:'All Field Required'});
    }

    getUserInfo(){
        var userId=0;
        var userName='';
        var name='';
        var email='';
        var picture='';
        var request = new XMLHttpRequest();
        request.open('GET', 'http://localhost:9393/user/', false);
        request.setRequestHeader('Content-Type','application/json');
        request.setRequestHeader('Authorization','Bearer '+localStorage.getItem("token"));
        request.onload = function () {
            var data =JSON.parse(this.response);
            var statusCode=request.status;
            if(statusCode>=200 &&statusCode<400){
               userId=data.userId;
               userName=data.username;
               name=data.name;
               picture=data.picture;
               email=data.email;
            }
            else{
                alert('Error');
            }
        }
        request.send();
        if(request.status==403){
            localStorage.removeItem("token");
            window.location = "/login";
        }
        this.setState({
            edit:false,
            username: userName,
            name: name,
            email: email,
            picture: picture,
            userId:userId
        });
        if(picture!=''&&picture!=null)
            this.getProfile();
    }

    getProfile(){
        var request = new XMLHttpRequest();
        var data;
        request.open('GET', 'http://localhost:9393/user/profile-image', false);
        request.setRequestHeader('Content-Type','application/json');
        request.setRequestHeader('Authorization','Bearer '+localStorage.getItem("token"));
        request.onload = function () {
            data =this.response;
            var statusCode=request.status;
            //localStorage.setItem("token", jwt);
            if(statusCode>=200 &&statusCode<400){
                console.log('/////'+data);
            }
            else{
                alert('Error');
            }
        }
        request.send();
        //document.getElementById('profileImg').src=data;
        //alert(request.status);
    }

    render() {
        return (
            <div>
            <main className="container">
                <br/>
                <h1 style={{textAlign:'center'}}>Personal Information</h1>
                <div class="row">
                    <div class="col-sm-6">
                        <div className="mb-3">
                        <br/><h3>Welcome <span style={{fontWeight:600}}>{this.state.username} !</span></h3>
                        </div>
                        <div className="mb-3">
                            {this.state.edit
                                ?<input type="text" placeholder='Name' required className="form-control" id="name"/>
                                :<label className="form-label"><span style={{fontWeight:600}}>Name : </span>{this.state.name}</label>
                            }
                        </div>
                        <div className="mb-3">
                            {this.state.edit
                                ?<input type="text" placeholder='Email'  required className="form-control" id="email"/>
                                :<label className="form-label"><span style={{fontWeight:600}}>Email : </span>{this.state.email}</label>
                            }
                        </div>
                        <div className="mb-3">
                            {this.state.edit
                                ?<input type="password" placeholder='New Password' required className="form-control" id="password"/>
                                :null
                            }
                        </div>
                    </div>
                    {/* <div class="col-sm-6">
                        <img src={img} class="avatar" id='profileImg' alt="Cinque Terre"/>
                       <input type="file" id='fileUpload' onChange={this.fileChangedHandler}/><br/>
                       <button onClick={this.uploadHandler}>Upload</button>
                    </div> */}
                </div>
                
                {this.state.edit
                    ?<div>
                       <input type="button" className="btn btn-primary" onClick={()=>{this.edit('c')}} value='Cancel' id="cancel"/>
                        <input style={{margin: '10px'}} type="button" className="btn btn-primary" onClick={()=>{this.edit('u')}} value='Update' id="update"/>
                    </div>
                    :<input type="button" className="btn btn-primary" onClick={()=>{this.edit('e')}} value='Edit' id="edit"/>
                }
                
                <label style={{color: '#FF0000', padding: '10px'}} >{this.state.error}</label>
            </main>
          </div>
         );
    }
}
 
export default User;