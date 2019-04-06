import React, { Component } from "react";
import MainPage from "./MainPage";
import FolderList from "./FolderList";
import NoteList from "./NoteList";
import Header from "./Header";
import { BrowserRouter, Route, Link } from "react-router-dom"
import "./App.css";
import FolderEdit from "./FolderEdit";

class App extends Component {
  constructor(props) {
    super(props);
    //shallow copy the initial state from the STORE prop
    this.state = { ...this.props.STORE };
  }

  componentDidMount() {
    console.log('App mounted')
  }

  getFolderID(routerProps) {
    return routerProps.match.params.folderID || null
  }

  renderMainPage = (routerProps) => {
    let { folders, notes } = this.state
    const folderID = this.getFolderID(routerProps)
    if (folderID) {
      
      //copy and filter notes from this.state
      notes = [...notes].filter(note => note.folderId === folderID)
    }

    return (
      <>
        <MainPage key="FolderList" {...routerProps} data={{ folders, notes }} />
      </>
    )
  }


  onFolderAdd = (folder) => {
    //TODO implement this
    //HINT need to setState to include newly added folder
  }

  render() {


    return (
      <div className="App">
        <Header />
        <Route
          exact path="/"
          render={(routerProps) => this.renderMainPage(routerProps)}
        />
        <Route
          path="/folder/:folderID"
          render={(routerProps) => this.renderMainPage(routerProps)}
        />

        <Route
          path="/addFolder"
          render={(routerProps) => (<FolderEdit {...{ ...routerProps, onFolderAdd: this.onFolderAdd }} />)}
        />

      </div>
    );
  }
}

export default App;
