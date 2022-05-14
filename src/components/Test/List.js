import React from 'react';

export default class List extends React.Component{
    render(){
        const items=[1,2,3,4,5,6];
        return(
        <div>
            <ul>
                {
                    items.map(item=>(
                        <li>{item}</li>
                    ))
                }
            </ul>
        </div>)
    }
}
