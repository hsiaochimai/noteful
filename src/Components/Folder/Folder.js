import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../../App.css';
import NotefulContext from "../../NotefulContext";
import PropTypes from 'prop-types'
class Folder extends Component {
    static propTypes={
        folder: PropTypes.array,
    }
    static contextType = NotefulContext
    render() {
        console.log(`these were the props that were sent to folder`, this.props.folders)
       
        let folders = this.props.folders.map((folder, i) => {
            return (
                <div className='folderDetails'key={i}>
                <h2 >
                <Link  to={`/folder/${folder.id}`}>
                    {folder.folder_name}
                </Link>
                </h2>
                <div className='folderButtons'>
                <Link to={`edit/folder/${folder.id}`}>
            <button className="editNoteButton">Edit Folder</button>
                        </Link>
                </div>
                </div>
            )

        })

        return (
            <div className='Folder'role='navigation'>
                <ul>
                    {folders}   
                </ul>
            </div>
        )
    }
}
export default Folder