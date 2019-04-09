import React, { Component } from 'react';
import Folder from './Folder'
import NoteList from './Components/Notes/NoteList'
import AddNote from './Components/Notes/AddNotePage'
import AddFolder from './Components/Folder/AddFolder'
import "./App.css"
import NotefulContext from './NotefulContext'
import {Link} from 'react-router-dom'

class MainPage extends Component{
    static contextType= NotefulContext
        render(){
            return(
                <div className='mainpage'>
                    <div className='sidebar'>
                        <Folder folders={this.context.folders} />
                        <Link to="/addFolder">
                        <button>Add Folder</button>
                        </Link>
                    </div>
                    <div className='main'>
                        <NoteList notes={this.context.notes} />
                        <Link to='/addNote'>
                            <button>Add Note</button>
                        </Link>
                    </div>
                </div>
            )
            
    }
}
export default MainPage