import React, { Component } from "react";
import MainPage from "./MainPage";
import Header from "./Header";
import { BrowserRouter, Route, Link } from "react-router-dom"
import "./App.css";

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
    return (
      <div className="App">
        <Header />
        <MainPage data={this.props.STORE} />

      </div>
    );
  }
}

export default App;
