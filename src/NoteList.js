import React, { Component } from "react";
import {Link} from 'react-router-dom';
import Note from "./Note";
class NoteList extends Component {
  render() {
    console.log(`these were the props sent to notelist`, this.props.notes)
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
    return (
      <div className="NoteList">
        {notes}
        <button>Add Note</button>
      </div>
    );
  }
}
export default NoteList;
