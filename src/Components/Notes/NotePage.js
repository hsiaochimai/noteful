import React,{Component} from 'react';
import Folder from '../Folder/Folder'
import NoteList from './NoteList'
import NoteContent from './NoteContent'
import BackButton from '../../BackButton'
import '../../App.css'
import NotefulContext from '../../NotefulContext';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
class NotePage extends Component{
static contextType=NotefulContext
    render(){
        const noteID = this.props.match.params.noteID
        let getNote=this.context.notes.filter(note => note.id === noteID)
        const notes=getNote[0].folderId
        const folders=this.context.folders.filter(folder=> folder.id===notes)
        console.log(`this was passed to NoteContent`, folders)
        
        return(
            <div className='mainpage'>
            <div className='sidebar'>
            <ErrorBoundary>
            <BackButton history={this.props.history}/>
            <Folder folders={folders}/>
            </ErrorBoundary>
            </div>
            <div className='main'>
            <ErrorBoundary>
            <NoteList notes={getNote}/>
            <NoteContent notes={getNote}/> 
            </ErrorBoundary>
            </div>
        </div>
        )
    }
}

export default NotePage;