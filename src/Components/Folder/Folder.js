import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import config from '../../config';
import NotefulContext from "../../NotefulContext";
import PropTypes from "prop-types";
class Folder extends Component {
  static propTypes = {
    folder: PropTypes.array
  };
  static contextType = NotefulContext;

  deleteFolderRequest(folderId, cb) {
    fetch(config.API_ENDPOINT_FOLDERS + folderId, {
      method: "DELETE",
      headers: {
        'authorization': `bearer ${config.API_KEY}`,
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error;
          });
        }
        cb(folderId);
      })

      .catch(error => {
        console.log(error);
      });
  }

  render() {
    let folders = this.props.folders.map((folder, i) => {
      return (
        <div className="folderDetails" key={i}>
          <h2>
            <Link to={`/folder/${folder.id}`}>{folder.folder_name}</Link>
          </h2>
          <div className="folderButtons">
            <Link to={`/edit/folder/${folder.id}`}>
              <button className="editFolderButton">Edit Folder</button>
            </Link>
            <button className='folderDeleteButton'onClick={() => {
            this.deleteFolderRequest(
              folder.id,
              this.context.deleteFolder)
          }
          }> Delete</button>
          </div>
        </div>
      );
    });

    return (
      <div className="Folder" role="navigation">
        <ul>{folders}</ul>
      </div>
    );
  }
}
export default Folder;
