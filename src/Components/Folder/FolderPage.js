import React, { Component } from 'react';
import NoteList from '../Notes/NoteList'
import '../../App.css'
import NotefulContext from '../../NotefulContext'
import Folder from './Folder';
import {Link} from 'react-router-dom'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import PropTypes from 'prop-types'
class FolderPage extends Component {
    static propTypes={
        match: PropTypes.object.isRequired
    }
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
                        <button className="addFolderButton">Add Folder</button>
                    </Link>
                    </ErrorBoundary>
                </div>
                <div className='main'>
                <ErrorBoundary>
                    <NoteList notes={notes} />
                    <Link to='/addNote'>
                        <button className="addNoteButton">Add Note</button>
                    </Link>
                </ErrorBoundary>
                </div>
            </div>
            
        )
       
    }
}

export default FolderPage
