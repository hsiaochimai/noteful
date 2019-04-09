import React, { Component } from "react";
import MainPage from "./MainPage";
import Header from "./Header";
import { BrowserRouter, Route, Link, Switch, matchPath } from "react-router-dom";
import "./App.css";
import FolderEdit from "./FolderEdit";
import NotePage from './NotePage'
import NotefulContext from './NotefulContext'
import { withRouter } from "react-router-dom"
import rp from 'route-parser'

class App extends Component {
  constructor(props) {
    super(props);
    //shallow copy the initial state from the STORE prop
    this.state = {
      currentFolderID: null,
      ...this.props.STORE
    };
  }

  componentDidUpdate() {
    const { match: params } = this.props
    console.log('SMTHNG CHANGED', this.props)
    const r = new rp("/folder/:folderID")
    const routeParams = r.match(this.props.location.pathname)
    //routeParams now holds folderID so you can setState
    debugger
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
        <MainPage key="FolderList" {...routerProps} />
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
    console.log('App re-render', this.props)
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
    }
    let { notes, folders } = contextValue
    // debugger

    return (
      <div className="App">
        <Header />
        <NotefulContext.Provider value={contextValue}>
          <Switch>
            <Route
              exact
              path="/"
              render={routerProps =>
                <MainPage key="FolderList" {...routerProps} />
              }
            />
            <Route
              exact
              path="/folder/:folderID"
              render={routerProps => {
                // debugger

                const folderID = routerProps.match.params.folderID
                notes = notes.filter(note => note.folderId === folderID);
                return <MainPage key="FolderList" {...routerProps} />

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
                const noteID = routerProps.match.params.noteID
                const notes = notes.filter(note => note.id === noteID)

                console.log(`folder id is`, folders)
                return <NotePage {...routerProps} data={{ folders, notes }} />
              }} />
          </Switch>

        </NotefulContext.Provider>
      </div>
    );
  }
}

export default withRouter(App);
