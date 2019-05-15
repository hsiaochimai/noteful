import React, { Component } from 'react';
import NoteList from '../Notes/NoteList'
import '../../App.css'
import NotefulContext from '../../NotefulContext'
import Folder from './Folder';
import {Link} from 'react-router-dom'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import PropTypes from 'prop-types'
import BackButton from '../../BackButton'
class FolderPage extends Component {
    static propTypes={
        match: PropTypes.object.isRequired
    }
static contextType= NotefulContext

    render() {
        
        const folderID = parseInt(this.props.match.params.folderID)
        const notes = this.context.notes.filter(note => note.folder_id === folderID)
        const folders  = this.context.folders.filter(folder=> folder.id===folderID) 
        return (
            
            <div className='mainpage'>
                <div className='sidebar'>
                <ErrorBoundary> 
                <BackButton history={this.props.history}/>                   
                    <Folder folders={folders} />
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
