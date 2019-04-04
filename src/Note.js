import React, { Component } from 'react';


class Note extends Component{
render(){
    console.log(`this is note props`,this.props.notes)
    let notes=this.props.notes.map((note,i) =>{
        console.log(note.name)
        return(
        <div className='noteDetails'key={i}>
        <h3>
        {note.name}
        </h3>
        <p>Modified on:{note.modified}</p>
        <button>Delete</button>
        </div>
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