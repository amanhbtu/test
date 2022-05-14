import React from 'react';

export default class Test extends React.Component{
    constructor(){
        super();
        this.state = {
            error: null,
            isLoaded: false,
            items: []
          };
    }
    componentDidMount(){

        fetch("https://reqres.in/api/user")
        .then(res => res.json())
        .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.data
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error:'Error'
          });
        }
      )
    }
    xmlAPIFetch(){
        var result;
        var req=new XMLHttpRequest();
        req.open('GET','https://reqres.in/api/user',false);
        req.onload=function(){
            result =JSON.parse(req.response);
            alert(result.page);
        }
        req.send();
        this.setState({
            res: result.page
        })
    }
    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
        return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
        return <div>Loading...</div>;
        } else {
        return (
            <div>
                <table border='1'>
                    {items.map(item=>(
                        <tr>
                            <td>{item.name}</td>
                            <td>{item.year}</td>
                            <td style={{color:'#98B2D1'}}>{item.color}</td>
                        </tr>
                    ))
                    }
                </table>
                <ul>
                {items.map(item => (
                    <li key={item.id}>
                    {item.name} {item.year} {item.color}  {item.pantone_value}
                    </li>
                ))}
                </ul>
            </div>
        );
        }
    }
}
