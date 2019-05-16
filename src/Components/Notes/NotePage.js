import React, { Component } from 'react';
import Folder from '../Folder/Folder'
import NoteList from './NoteList'
import NoteContent from './NoteContent'
import BackButton from '../../BackButton'
import '../../App.css'
import NotefulContext from '../../NotefulContext';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import PropTypes from 'prop-types'
<<<<<<< HEAD
class NotePage extends Component {
    static contextType = NotefulContext
    static propTypes = {
        match: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
    }
    render() {
        const noteID = parseInt(this.props.match.params.noteID)
        console.log(`this is noteID`, noteID)
        let contextNote = this.context.notes
        console.log(`this is context`, this.context)
        let getNote = this.context.notes.filter(note => note.id === noteID)
        console.log(`this is getNote`, getNote)

        const { context } = this
        if (!getNote.length || !context.foldersLoaded || !context.notesLoaded) {
            return (<p>Loading...</p>);
        }

        const notes = getNote[0].folder_id

        const folders = this.context.folders.filter(folder => folder.id === notes)


        return (
=======
class NotePage extends Component{
static contextType=NotefulContext
static propTypes={
    match:PropTypes.object.isRequired,
    history:PropTypes.object.isRequired,
}
    render(){
        console.log(`NotePage render time!`)
        // debugger
        // return 'Foo!'
        const noteID = this.props.match.params.noteID
        let getNote=this.context.notes.filter(note => note.id === noteID)
        const notes=getNote[0].folderId
        const folders=this.context.folders.filter(folder=> folder.id===notes)
        console.log(`this was passed to NoteContent`, folders)
        
        return(
>>>>>>> 6fbc2d9a939084a64f5b7e727e609e89a2a282a3
            <div className='mainpage'>
                <div className='sidebar'>
                    <ErrorBoundary>
                        <BackButton history={this.props.history} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <Folder folders={folders} />
                    </ErrorBoundary>

                </div>
                <div className='main'>
                    <ErrorBoundary>
                        <NoteList notes={getNote} />
                        <NoteContent notes={getNote} />
                    </ErrorBoundary>
                </div>
            </div>
        )
    }
}

export default NotePage;