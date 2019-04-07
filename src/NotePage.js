import React,{Component} from 'react';
import FolderList from './FolderList'
import NoteList from './NoteList'
import NoteContent from './NoteContent'
class NotePage extends Component{

    render(){
        console.log(`this was passed to NoteContent`, this.props)
        const notes=this.props.data.notes[0].folderId
        const folders=this.props.data.folders.filter(folder=> folder.id===notes)
        return(
            <div className='NotePage'>
            <FolderList folders={folders}/>
            <NoteList notes={this.props.data.notes}/>
            <NoteContent notes={this.props.data.notes}/>
        </div>
        )
    }
}

export default NotePage;