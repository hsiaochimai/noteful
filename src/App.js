import React, { Component } from "react";
import Header from "./Header";
import { BrowserRouter, Route, Link, withRouter } from "react-router-dom";
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
deleteNote= NoteId=>{
  console.log(`this is what delete note does`,NoteId)
  const newNotes= this.state.notes.filter(note=>
    note.id !==NoteId
    )
    this.props.history.push('/')
    this.setState({
      notes: newNotes
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

  

  onFolderAdd = folder => {
    //TODO implement this
    //HINT need to setState to include newly added folder
    this.props.history.push('/')
    this.setState({
      folders: [...this.state.folders, folder]
    })

  };
  onNoteAdd= note=>{
    this.props.history.push('/')
    this.setState({
      notes: [...this.state.notes, note]
    })
  }
  
  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote,
      addFolder: this.onFolderAdd,
      addNote:this.onNoteAdd
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

export default withRouter(App);
