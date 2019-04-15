import PropTypes from 'prop-types';
import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import "./App.css";
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';
import AddFolderPage from './Components/Folder/AddFolderPage';
import FolderPage from './Components/Folder/FolderPage';
import AddNotePage from './Components/Notes/AddNotePage';
import NotePage from './Components/Notes/NotePage';
import Header from "./Header";
import MainPage from './MainPage';
import NotefulContext from './NotefulContext';
import DataLoader from './DataLoader'

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
    };
  }
  setFolders = folders => {
    this.setState({
      folders,
      // error: null,
    })
  }
  setNotes = notes => {
    this.setState({
      notes,
      // error: null
    })
  }
  deleteNote = NoteId => {
    console.log(`this is what delete note does`, NoteId)
    const newNotes = this.state.notes.filter(note =>
      note.id !== NoteId
    )
    this.props.history.push('/')
    this.setState({
      notes: newNotes
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
      addNote: this.onNoteAdd
    }


    return (

      <div className="App">
        <Header />
        <ErrorBoundary>
          <DataLoader
            url={'http://localhost:9090/folders'}
            onDataLoaded={this.setFolders}
          />
          <DataLoader
            url={'http://localhost:9090/notes'}
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

          <Route
            path="/note/:noteID"
            render={routerProps => {
              // console.log(match, location, history)  
              // debugger

              return (
                <DataLoader
                  url={'http://localhost:9090/notes'}
                  onDataLoaded={this.setNotes}
                >
                  <NotePage {...routerProps} />
                </DataLoader>)
            }
            }
          />

          <Route
            path='/addNote'
            component={AddNotePage}
          />



        </NotefulContext.Provider>
      </div>

    );
  }
}

export default withRouter(App);
