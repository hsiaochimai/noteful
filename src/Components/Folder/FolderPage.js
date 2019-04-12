import React, { Component } from 'react';
import NoteList from '../Notes/NoteList'
import '../../App.css'
import NotefulContext from '../../NotefulContext'
import Folder from './Folder';
import {Link} from 'react-router-dom'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
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
                <ErrorBoundary>
                    <Folder folders={folders} />
                    <Link to="/addFolder">
                        <button>Add Folder</button>
                    </Link>
                    </ErrorBoundary>
                </div>
                <div className='main'>
                <ErrorBoundary>
                    <NoteList notes={notes} />
                    <Link to='/addNote'>
                        <button>Add Note</button>
                    </Link>
                </ErrorBoundary>
                </div>
            </div>
            
        )
       
    }
}

export default FolderPage
