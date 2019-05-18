import PropTypes from 'prop-types';
import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import "./App.css";
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';
import config from "./config";
import AddFolderPage from './Components/Folder/AddFolderPage';
import FolderPage from './Components/Folder/FolderPage';
import AddNotePage from './Components/Notes/AddNotePage';
import NotePage from './Components/Notes/NotePage';
import Header from "./Header";
import MainPage from './MainPage';
import NotefulContext from './NotefulContext';
import DataLoader from './DataLoader'
import EditNoteForm from './Components/Notes/EditNote'
import EditFolderForm from './Components/Folder/EditFolder'

class App extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    //shallow copy the initial state from the STORE prop
    this.state = {
      folders: [],
      notes: [],
      currentFolder: null,
      error: null,
      foldersLoaded: false,
      notesLoaded: false,
    };
  }
  setFolders = folders => {
    this.setState({
      foldersLoaded: true,
      folders,
      // error: null,
    })
  }
  setNotes = notes => {
    this.setState({
      notesLoaded: true,
      notes,
      // error: null
    })
  }

  deleteNote = NoteId => {
    const newNotes = this.state.notes.filter(note =>
      note.id !== NoteId
    )
    this.props.history.push('/')
    this.setState({
      notes: newNotes
    })


  }
  deleteFolder = FolderId => {
    const newFolders = this.state.folders.filter(folder =>
      folder.id !== FolderId
    )
    const newNotes = this.state.notes.filter(note =>
      note.folder_id !== FolderId
    )
    this.props.history.push('/')
    this.setState({
      folders: newFolders,
      notes: newNotes,
    })


  }
  onFolderAdd = folder => {
    //TODO implement this
    //HINT need to setState to include newly added folder
    this.props.history.push('/')
    this.setState({
      folders: [...this.state.folders, folder]
    })

  };
  onNoteAdd = note => {
    this.props.history.push('/')
    this.setState({
      notes: [...this.state.notes, note]
    })
  };
  updateNote = updatedNote => {
    const newNotes = this.state.notes.map(n =>
      (n.id === updatedNote.id)
        ? updatedNote
        : n
    )
    this.setState({
      notes: newNotes
    })
  }
  updateFolder = updatedFolder => {
    const newFolders = this.state.folders.map(f =>
      (f.id === updatedFolder.id)
        ? updatedFolder
        : f
    )
    this.setState({
      folders: newFolders
    })
  }
  render() {
    const { error } = this.state
    if (error) {
      // debugger
      return (
        <h1>Yo, there's a problem: {error.toString()}</h1>
      )
    }

    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote,
      addFolder: this.onFolderAdd,
      addNote: this.onNoteAdd,
      updateNote: this.updateNote,
      updateFolder: this.updateFolder,
      deleteFolder: this.deleteFolder,
      notesLoaded: this.state.notesLoaded,
      foldersLoaded: this.state.foldersLoaded,
    }


    return (

      <div className="App">
        <Header />
        <ErrorBoundary>
          <DataLoader
            url={config.API_ENDPOINT_FOLDERS}
            onBeforeFetch={() => this.setState({ foldersLoaded: false })}
            onDataLoaded={this.setFolders}
          />
          <DataLoader
            onBeforeFetch={() => this.setState({ notesLoaded: false })}
            url={config.API_ENDPOINT_NOTES}
            onDataLoaded={this.setNotes}
          />
        </ErrorBoundary>


        <NotefulContext.Provider value={contextValue}>
          <Route
            exact
            path="/"
            component={MainPage}
          />


          <Route
            path="/folder/:folderID"
            component={FolderPage}

          />

          <Route
            path="/addFolder"
            component={AddFolderPage}
          />
          <Route path="/edit/folder/:folderID"
            component={EditFolderForm}
          />
          <Route
            path="/note/:noteID"
            component={NotePage}
          />

          <Route
            path='/addNote'
            component={AddNotePage}
          />
          <Route path="/edit/note/:noteid"
            component={EditNoteForm}
          />



        </NotefulContext.Provider>
      </div>

    );
  }
}

export default withRouter(App);
