import React, { Component } from "react";
import Header from "./Header";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./App.css";
import FolderEdit from '../src/Components/Folder/FolderEdit';
import NotePage from './Components/Notes/NotePage'
import FolderPage from './Components/Folder/FolderPage'
import NotefulContext from './NotefulContext'
import MainPage from './MainPage'

class App extends Component {
  constructor(props) {
    super(props);
    //shallow copy the initial state from the STORE prop
    this.state = { ...this.props.STORE };
  }

  componentDidMount() {
    console.log("App mounted");
  }

  // getFolderID(routerProps) {
  //   console.log(`this is routerProps`, routerProps);
  //   return routerProps.match.params.folderID || null;
  // }
 
  // renderMainPage = routerProps => {
  //   let { folders, notes } = this.state;
  //   const folderID = this.getFolderID(routerProps);
  //   if (folderID) {
  //     //copy and filter notes from this.state
  //     notes = [...notes].filter(note => note.folderId === folderID);
  //     console.log(`this is what notes is doing`, notes);
  //   }

  //   return (
  //     <>
  //       <MainPage key="FolderList" {...routerProps} />
  //     </>
  //   );
  // };
 

  onFolderAdd = folder => {
    //TODO implement this
    //HINT need to setState to include newly added folder
  };

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
    }
    

    return (
      <div className="App">
        <Header />
        <NotefulContext.Provider value={contextValue}>
          <Route
            exact
            path="/"
            component={MainPage}
            />
            
          
          <Route
            path="/folder/:folderID"
            component = {FolderPage}
         
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
            component={NotePage}
            />

        </NotefulContext.Provider>
      </div>
    );
  }
}

export default App;
