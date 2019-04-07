import React, { Component } from 'react';
import {Link} from 'react-router-dom';


class Note extends Component{
render(){
    let notes=this.props.notes.map((note,i) =>{
        return(
        <Link to={`/note/${note.id}`}>
        <div className='noteDetails'key={i} onClick={(e=>{
            console.log(`this clicked!`)
        })}>
        <h3>
        {note.name}
        </h3>
        <p>Modified on:{note.modified}</p>
        <button>Delete</button>
        </div>
        </Link>
        )
        
    })
    return(
        <div className='Note'>
        {notes}
        
        </div>
    )
}
}
export default Note