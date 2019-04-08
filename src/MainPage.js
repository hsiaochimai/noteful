import React, { Component } from 'react';
import FolderList from './FolderList'
import NoteList from './NoteList'
import AddNote from './AddNote'
import AddFolder from './AddFolder'
import "./App.css"
class MainPage extends Component {

    render() {
        const {notes, folders} = this.props.data
        console.log(`this is the props that was passed to the mainpage`, this.props.data.notes)
        return (
            <div className='mainpage'>
                <div className='sidebar'>
                    <FolderList folders={folders} />
                    <AddFolder />
                </div>
                <div className='main'>
                    <NoteList notes={notes} />
                    <AddNote />
                </div>
            </div>
        )
    }
}
export default MainPage