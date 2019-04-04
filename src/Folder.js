import React, { Component } from "react";

class Folder extends Component{
    render(){
        console.log(`these were the props that were sent to folder`, this.props.folders)
        
    let folders=this.props.folders.map((folder, i)=>{
    console.log(`this is the folders name`,folder.name, `index is`,folder.id)
return <li key={i} onClick={(e)=>{
    console.log(`this was clicked`,folder.id)}}
    
>{folder.name}</li>

})

        return(
            <div className='Folder'>
            <ul>
                {folders}
            </ul>
            <button>Add Folder</button>
            </div>
        )
    }
}
export default Folder