import React, { Component } from "react";
import {Link, Route} from 'react-router-dom';
import NotefulContext from '../../NotefulContext'

import '../../App.css'

function deleteNoteRequest(noteId, cb){
  fetch('http://localhost:9090/notes'+`/${noteId}`,{
  method:'DELETE',
  headers:{
    'content-type': 'application/json',
  }
})
.then(res=>{
  if(!res.ok){
    return res.json().then(error=>{
      throw error
    })
  }
  return res.json()
})
.then(data=>{
  console.log({data})
  cb(noteId)
})
.catch(error=>{
  console.log(error)
})
   }


class NoteList extends Component {

  static contextType=NotefulContext
  render() {
    console.log(`these were the props sent to notelist`, this.context)
    let notes=this.props.notes.map((note,i) =>{
      return(
      
      <div className='noteDetails'key={i}>
      <Link to={`/note/${note.id}`}>
      <h3>{note.name}</h3>
      </Link>
      <p>Modified on:{note.modified}</p>
      <button onClick={()=>{
        console.log(`this was clicked`, note.id)
        deleteNoteRequest(
          note.id,
          this.context.deleteNote)
              }
            }> Delete</button>
              </div>
        
        )
        
    })
    return (
      <div className="NoteList">
        {notes}
      </div>
    );
  }
}
export default NoteList;
