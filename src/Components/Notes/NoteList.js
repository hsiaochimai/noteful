import React, { Component } from "react";
import { Link } from 'react-router-dom';
import '../../App.css';
import NotefulContext from '../../NotefulContext';
import PropTypes from 'prop-types'
import config from '../../config';

function deleteNoteRequest(noteId, cb) {
  fetch(config.API_ENDPOINT_NOTES+  noteId, {
    method: 'DELETE',
    headers: {
      'authorization': `bearer ${config.API_KEY}`,
      'content-type': 'application/json',
    }
  })
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => {
          throw error
        })
      }
      cb(noteId)
    })
    
    .catch(error => {
      console.log(error)
    })
}


class NoteList extends Component {
static propTypes={
notes: PropTypes.array.isRequired,
}
  static contextType = NotefulContext
  render() {
    const { notes } = this.props
    notes.sort((a, b) => a.modified - b.modified)
    let notesHTML = this.props.notes.map((note, i) => {
      return (

        <div className='noteDetails' role='main'key={i}>
          <Link to={`/note/${note.id}`}>
            <h2>{note.note_name}</h2>
          </Link>
          <div className='noteButtons'>
          <button className='noteDeleteButton'onClick={() => {
            deleteNoteRequest(
              note.id,
              this.context.deleteNote)
          }
          }> Delete</button>
          <Link to={`/edit/note/${note.id}`}>
            <button className="editNoteButton">Edit Note</button>
                        </Link>
                        </div>
          <p>Modified on:{note.modified}</p>
          
        </div>

      )

    })
    return (
      <div className="NoteList">
        {notesHTML}
      </div>
    );
  }
}
export default NoteList;
