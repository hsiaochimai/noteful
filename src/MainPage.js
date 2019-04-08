import React, { Component } from 'react';
import FolderList from './FolderList'
import NoteList from './NoteList'
import AddNote from './AddNote'
import AddFolder from './AddFolder'
import "./App.css"
import NotefulContext from './NotefulContext'

class MainPage extends Component {

    render() {
        const { notes, folders } = this.props.data
        console.log(`MainPage props`, this.props)
        console.log(`this is the props that was passed to the mainpage`, notes)
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

export default (props) =>
    (<NotefulContext.Consumer>
        {(STORE) => {
            // debugger
            return (
                <MainPage {...props} data={STORE} />
            )
        }}
    </NotefulContext.Consumer>)
