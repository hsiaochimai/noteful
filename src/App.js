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
    //shallow copy
    const storeCopy = { ...this.props.STORE }
    const pageProps = {
      data: storeCopy,
    }
    console.log('Page props:', pageProps)
    return (
      <div className="App">
        <Header />
        <MainPage {...pageProps} />

      </div>
    );
  }
}

export default App;
