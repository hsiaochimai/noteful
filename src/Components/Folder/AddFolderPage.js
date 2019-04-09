import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom"
import BackButton from '../../BackButton'
import AddFolder from '../Folder/AddFolder'
import '../../App.css';

export default class AddFolderPage extends Component {
    render() {
        return (
            
            <div className='AddFolderPage'>
            <BackButton history={this.props.history}/>
            <AddFolder />
            </div>
            
        )
    }
}
