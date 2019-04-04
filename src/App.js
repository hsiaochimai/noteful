import React, { Component } from "react";
import MainPage from "./MainPage";
import Header from "./Header";
import { BrowserRouter, Route, Link } from "react-router-dom"
import "./App.css";
import FolderEdit from "./FolderEdit";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      notes: []
    };
  }

  render() {
    console.log('App props:', this.props)
    //shallow copy

    let innerComponent
    switch (this.props.match.path) {
      case '/addFolder':

        //TODO build some props here, like an onAdd callback
        innerComponent = (<FolderEdit />)
        break;
      case '/folder/:folderID':
      case '/':
        const storeCopy = { ...this.props.STORE }

        const folderID = this.props.match.params.folderID
        if (folderID) {
          storeCopy.notes = storeCopy.notes.filter(note => note.folderId === folderID)
        }
        const pageProps = {
          data: storeCopy,
        }
        console.log('Page props:', pageProps)
        innerComponent = (<MainPage {...pageProps} />)
        break;
      default:
        //
        break;
    }
    return (
      <div className="App">
        <Header />
        {innerComponent}

      </div>
    );
  }
}

export default App;
