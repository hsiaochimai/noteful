import React, { Component } from 'react';
import Folder from './Folder'
import NoteList from './Components/Notes/NoteList'
import AddNote from './Components/Notes/AddNote'
import AddFolder from './Components/Folder/AddFolder'
import "./App.css"
import NotefulContext from './NotefulContext'

class MainPage extends Component{
    static contextType= NotefulContext
        render(){
            return(
                <div className='mainpage'>
                    <div className='sidebar'>
                        <Folder folders={this.context.folders} />
                        <AddFolder />
                    </div>
                    <div className='main'>
                        <NoteList notes={this.context.notes} />
                        <AddNote />
                    </div>
                </div>
            )
            
    }
}
export default MainPage