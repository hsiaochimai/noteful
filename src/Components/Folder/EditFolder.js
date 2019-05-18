import React, { Component } from "react";
// import { BrowserRouter, Route, Link } from "react-router-dom"
import '../../App.css';
import NotefulContext from '../../NotefulContext';
import ValidationError from '../ValidationErrors/ValidationError';
import config from '../../config';
export default class EditFolderForm extends Component {
    
    static contextType = NotefulContext
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            folder_name: '',
            folderValid: null,
            formValid: null,
            validationMessages: {
                name: ''
            },
        };
    }
    componentDidMount() {
        const folderId = parseInt(this.props.match.params.folderID);
        fetch(config.API_ENDPOINT_FOLDERS + folderId, {
          method: "GET",
          headers: {
            'authorization': `bearer ${config.API_KEY}`,
            "Content-Type": "application/json"
          }
        })
          .then(res => {
            if (!res.ok) {
              return res.json().then(error => {
                // then throw it
                throw error;
              });
            }
            return res.json();
          })
          .then(resJson => {
            this.setState({
              id: resJson.id,
              folder_name: resJson.folder_name,
              
            });
          })
    
          .catch(error => {
            console.error(error);
            this.setState({ error });
          });
      }
      folderChanged(folder_name) {
        this.setState({
            folder_name
        }, () => { this.validateFolderName(folder_name) });
    }

validateFolderName(fieldValue) {
    const fieldErrors = { ...this.state.validationMessages }
    let hasError = false;
    fieldValue = fieldValue.trim();
    if (fieldValue.length === 0) {
        fieldErrors.name = 'Folder name is required';
        hasError = true;
    }
    else {
        if (fieldValue.length < 3) {
            fieldErrors.name = 'Folder name must be at least 3 characters'
            hasError = true;
        } else {
            fieldErrors.name = '';
            hasError = false;
        }
    }
    this.setState({
        validationMessages: fieldErrors,
        folderValid: !hasError
    }, this.formValid);
}
formValid() {
    this.setState({
        formValid: this.state.folderValid
    })
}
handleClickCancel = () => {
    this.props.history.push("/");
  };
  handleFolderSubmit = e => {
    e.preventDefault();
    const folderId = this.props.match.params.folderID;
    const { id, folder_name } = this.state;
    const newFolder = { id, folder_name };
    fetch(config.API_ENDPOINT_FOLDERS + folderId, {
      method: "PATCH",
      body: JSON.stringify(newFolder),
      headers: {
        'authorization': `bearer ${config.API_KEY}`,
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) return res.json().then(error => Promise.reject(error));
      })

      .then(() => {
        this.context.updateFolder(newFolder);
        this.resetFields(newFolder);
        this.props.history.push("/");
      })
      .catch(error => {
        console.error(error);
        this.setState({ error });
      });
  };
  resetFields = newFields => {
    this.setState({
      id: newFields.id || "",
      folder_name: newFields.note_name || "",
    });
  };

      render(){
          const{folder_name}=this.state;
          return(
            <form onSubmit={e => this.handleFolderSubmit(e)}>
            <div className='EditFolderForm' role='form'>
                <h2>Edit Folder</h2>
                
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' name='folderName' value={folder_name}onChange={e => this.folderChanged(e.target.value)} />
                <ValidationError hasError={!this.state.folderValid} message={this.state.validationMessages.name} />
            </div>
            <div className='EditFolderButtons'>
            <button
              className="cancel"
              type="button"
              onClick={this.handleClickCancel}
            >
              Cancel
            </button>
            <button className="editFolderSave" type='submit' disabled={!this.state.formValid}>Save</button>
            </div>
        </form>
          )
      }
    }
