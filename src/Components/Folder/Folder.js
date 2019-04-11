import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom"
import '../../App.css'
import NotefulContext from "../../NotefulContext";

class Folder extends Component {
    static contextType= NotefulContext
    render() {
        console.log(`these were the props that were sent to folder`, this.props.folders)

        let folders = this.props.folders.map((folder, i) => {
            console.log(`this is the folders name`, folder.name, `index is`, folder.id)
            return (
                <Link to={`/folder/${folder.id}`}>
                    <li key={i} >{folder.name}</li>
                </Link>
            )

        })

        return (
            <div className='Folder'>
                <ul>
                    {folders}
                </ul>
            </div>
        )
    }
}
export default Folder