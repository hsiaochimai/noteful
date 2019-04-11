import React, { Component } from 'react';
import NoteList from '../Notes/NoteList'
import AddNote from '../Notes/AddNotePage'
import AddFolder from './AddFolder'
import '../../App.css'
import NotefulContext from '../../NotefulContext'
import Folder from './Folder';
import {Link} from 'react-router-dom'

class FolderPage extends Component {
static contextType= NotefulContext
    render() {
        
        const folderID = this.props.match.params.folderID
        const notes = this.context.notes.filter(note => note.folderId === folderID)
        console.log(`this is the notes in folderpage`, notes)
        const folders  = this.context.folders
        return (
            <div className='mainpage'>
                <div className='sidebar'>
                    <Folder folders={folders} />
                    <Link to="/addFolder">
                        <button>Add Folder</button>
                    </Link>
                </div>
                <div className='main'>
                    <NoteList notes={notes} />
                    <Link to='/addNote'>
                        <button>Add Note</button>
                    </Link>
                </div>
            </div>
            
        )
       
    }
}

export default FolderPage
