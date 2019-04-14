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
                <li key={i}>
                <Link  to={`/folder/${folder.id}`}>
                    {folder.name}
                </Link>
                </li>
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