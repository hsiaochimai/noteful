import React, { Component } from 'react';
import NoteList from '../Notes/NoteList'
import AddNote from '../Notes/AddNote'
import AddFolder from './AddFolder'
import '../../App.css'
import NotefulContext from '../../NotefulContext'
import Folder from '../../Folder';

class FolderPage extends Component {
static contextType= NotefulContext
    render() {
        
        const folderID = this.props.match.params.folderID
        let getNotes = this.context.notes.filter(note => note.folderId === folderID)
        const folders  = this.context.folders
        return (
            <div className='mainpage'>
                <div className='sidebar'>
                    <Folder folders={folders} />
                    <AddFolder />
                </div>
                <div className='main'>
                    <NoteList notes={getNotes} />
                    <AddNote />
                </div>
            </div>
            
        )
       
    }
}

export default FolderPage
