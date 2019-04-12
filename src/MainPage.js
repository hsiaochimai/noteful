import React, { Component } from 'react';
import Folder from './Components/Folder/Folder'
import NoteList from './Components/Notes/NoteList'
import "./App.css"
import NotefulContext from './NotefulContext'
import {Link} from 'react-router-dom'
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary'

class MainPage extends Component{
    static contextType= NotefulContext
        render(){
            return(
                <div className='mainpage'>
                    <div className='sidebar'>
                    <ErrorBoundary>
                        <Folder folders={this.context.folders} />
                        <Link to="/addFolder">
                        <button>Add Folder</button>
                        </Link>
                        </ErrorBoundary>
                    </div>
                    <div className='main'>
                    <ErrorBoundary>
                        <NoteList notes={this.context.notes} />
                        <Link to='/addNote'>
                            <button>Add Note</button>
                        </Link>
                        </ErrorBoundary>
                    </div>
                </div>
            )
            
    }
}
export default MainPage