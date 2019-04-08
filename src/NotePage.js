import React,{Component} from 'react';
import FolderList from './FolderList'
import NoteList from './NoteList'
import NoteContent from './NoteContent'
import BackButton from './BackButton'
import "./App.css"
class NotePage extends Component{

    render(){
        console.log(`this was passed to NoteContent`, this.props)
        const notes=this.props.data.notes[0].folderId
        const folders=this.props.data.folders.filter(folder=> folder.id===notes)
        return(
            <div className='mainpage'>
            <div className='sidebar'>
            <BackButton history={this.props.history}/>
            <FolderList folders={folders}/>
            </div>
            <div className='main'>
            <NoteList notes={this.props.data.notes}/>
            <NoteContent notes={this.props.data.notes}/>
            </div>
        </div>
        )
    }
}

export default NotePage;