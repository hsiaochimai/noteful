import React, { Component } from 'react';
import FolderList from './FolderList'
import NoteList from './NoteList'
class MainPage extends Component{
render(){
    console.log(`this is the props that was passed to the mainpage`, this.props.data.notes)
    return(
        <div className='mainpage'>
            <FolderList folders={this.props.data.folders}/>
            <NoteList notes={this.props.data.notes}/>
        </div>
    )
}
}
export default MainPage