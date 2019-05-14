import React,{Component} from 'react';
import Folder from '../Folder/Folder'
import NoteList from './NoteList'
import NoteContent from './NoteContent'
import BackButton from '../../BackButton'
import '../../App.css'
import NotefulContext from '../../NotefulContext';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import PropTypes from 'prop-types'
class NotePage extends Component{
static contextType=NotefulContext
static propTypes={
    match:PropTypes.object.isRequired,
    history:PropTypes.object.isRequired,
}
    render(){
        const noteID = parseInt(this.props.match.params.noteID)
        
        let getNote=this.context.notes.filter(note => note.id === noteID)
        
        const notes=getNote[0].folder_id
        
         const folders=this.context.folders.filter(folder=> folder.id===notes)
         
                
        return(
            <div className='mainpage'>
            <div className='sidebar'>
            <ErrorBoundary>
            <BackButton history={this.props.history}/>
            </ErrorBoundary>
            <ErrorBoundary>
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