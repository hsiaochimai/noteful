import React, { Component } from "react";
import MainPage from "./MainPage";
import FolderList from "./FolderList";
import NoteList from "./NoteList";
import Header from "./Header";
import NoteContent from "./NotePage";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./App.css";
import FolderEdit from "./FolderEdit";
import NotePage from './NotePage'

class App extends Component {
  constructor(props) {
    super(props);
    //shallow copy the initial state from the STORE prop
    this.state = { ...this.props.STORE };
  }

  componentDidMount() {
    console.log("App mounted");
  }

  getFolderID(routerProps) {
    console.log(`this is routerProps`, routerProps);
    return routerProps.match.params.folderID || null;
  }
  getNoteID(routerProps) {
    console.log(`this is the params`, routerProps.match.params.noteID);
    return routerProps.match.params.noteID || null;
  }
  renderMainPage = routerProps => {
    let { folders, notes } = this.state;
    const folderID = this.getFolderID(routerProps);
    if (folderID) {
      //copy and filter notes from this.state
      notes = [...notes].filter(note => note.folderId === folderID);
      console.log(`this is what notes is doing`, notes);
    }

    return (
      <>
        <MainPage key="FolderList" {...routerProps} data={{ folders, notes }} />
      </>
    );
  };
  selectedNote = routerProps => {
    const noteID = this.getNoteID(routerProps);

    if (noteID) {
      return <NotePage notes={this.state.notes} />;
    }
  };

  onFolderAdd = folder => {
    //TODO implement this
    //HINT need to setState to include newly added folder
  };

  render() {
    const notes= this.state.notes
    const folders =this.state.folders
    return (
      <div className="App">
        <Header />
        <Route
          exact
          path="/"
          render={routerProps => 
            <MainPage key="FolderList" {...routerProps} data={{ folders, notes }} />
          }
        />
        <Route
          path="/folder/:folderID"
          render={routerProps => {
            const folderID= routerProps.match.params.folderID 
            const notes = this.state.notes.filter(note => note.folderId === folderID);
            return <MainPage key="FolderList" {...routerProps} data={{ folders, notes }} />

          }}
        />

        <Route
          path="/addFolder"
          render={routerProps => (
            <FolderEdit
              {...{ ...routerProps, onFolderAdd: this.onFolderAdd }}
            />
          )}
        />
        <Route
          path="/note/:noteID"
          render={routerProps => {
            const noteID=routerProps.match.params.noteID
            const notes= this.state.notes.filter(note=>note.id===noteID)
      
            console.log(`folder id is`,folders)
            return <NotePage {...routerProps} data={{ folders, notes }}/>
            
          }}
        
            // this.selectedNote(routerProps)}
        />
      </div>
    );
  }
}

export default App;
