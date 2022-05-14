import React from 'react'

export default class LifeCycle extends React.Component{
    componentDidUpdate(){
        alert('//This is Did Update');
    }
   
    componentDidMount(){
        alert('//This is Did Mount');
    }

    constructor(){
        super();
        this.state={
            name: ''
        }
        alert('//This is Constructor');
    }

    render(){
        alert('This is Render')
        return(
            <div>
                <p>Life Cycle of React</p>
                Name :
                <input type='text' value={this.state.name} onChange={()=>{
                    alert('This is Text Change');
                    this.setState({name:'Nagar'});
                    }} id=''name/>
               
               
                <input type='submit' onClick={()=>{
                    alert('This is Submit');
                    this.setState({name:'Prerna'});
                    }} value='Update'/>
            </div>
        );
    }
    
    

    
}