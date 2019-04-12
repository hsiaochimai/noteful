import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../../App.css';
import NotefulContext from "../../NotefulContext";

class Folder extends Component {
    static contextType = NotefulContext
    render() {
        console.log(`these were the props that were sent to folder`, this.props.folders)
        // throw new Error('Boo!')
        // if (Math.random() < 0.3) {
        //     const title = this.props.foldersx.title
        // }
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