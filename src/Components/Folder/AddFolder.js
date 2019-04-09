import React, { Component } from "react";
import FolderPage from "./FolderPage";
import Header from "../../Header";
import { BrowserRouter, Route, Link } from "react-router-dom"
import BackButton from '../../BackButton'
import '../../App.css';

export default class AddFolder extends Component {
    render() {
        return (
            
            <form>
                <div className='AddFolderForm'>
                <h3>Create a Folder</h3>
                <label for ='name'>Name</label>
                <input type='text' id='name' name='folderName'/>
                </div>
                <button type='submit'>Add Folder</button>
            </form>
            
        )
    }
}