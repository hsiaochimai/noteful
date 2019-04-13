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
                <Link key={i} to={`/folder/${folder.id}`}>
                    <li  >{folder.name}</li>
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