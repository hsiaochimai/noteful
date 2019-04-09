import React, { Component } from "react";
import Header from "./Header";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./App.css";
import AddFolderPage from './Components/Folder/AddFolderPage';
import NotePage from './Components/Notes/NotePage'
import FolderPage from './Components/Folder/FolderPage'
import NotefulContext from './NotefulContext'
import MainPage from './MainPage'
import AddNotePage from './Components/Notes/AddNotePage'

class App extends Component {
  constructor(props) {
    super(props);
    //shallow copy the initial state from the STORE prop
    this.state = { 
      folders :[],
      notes: [],
      currentFolder: null,
      error: null, 
    };
  }
getFolders= folders=>{
  this.setState({
    folders,
    error:null,
  })
}
getNotes= notes=>{
  this.setState({
    notes, 
    error:null
  })
}
  componentDidMount() {
    console.log("App mounted");
    fetch('http://localhost:9090/folders',{
      method: "GET",
      headers: {
        "content-type": "application/json",
        }
      })
        .then(res=>{
          if (!res.ok){
            throw new Error(res.status)
          }
          return res.json()
        })
        .then(resJson=>{
          console.log(`hello resJson`, resJson)
          return this.getFolders(resJson)
          })
        .catch(error=>this.setState({error})) 

    fetch('http://localhost:9090/notes',{
      method: "GET",
      headers: {
        "content-type": "application/json",
      }
    })
      .then(res=>{
        if (!res.ok){
          throw new Error (res.status)
        }
        return res.json()
      })
      .then(resJson=>{
        console.log(`hello Notes resJson`,resJson)
        return this.getNotes(resJson)
      })
      .catch(error=> this.setState({error}))
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
            component={AddFolderPage}
              />
           
          <Route
            path="/note/:noteID"
            component={NotePage}
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

export default App;
