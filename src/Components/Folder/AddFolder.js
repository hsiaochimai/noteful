import React, { Component } from "react";
// import { BrowserRouter, Route, Link } from "react-router-dom"
import '../../App.css';
import NotefulContext from '../../NotefulContext';
import ValidationError from '../ValidationErrors/ValidationError'

export default class AddFolder extends Component {
    static contextType = NotefulContext
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            folderValid: null,
            formValid: null,
            validationMessages: {
                name: ''
            },
        };
    }
    folderChanged(name) {
        this.setState({
            name
        }, () => { this.validateFolderName(name) });
    }
    handleFolderSubmit(e) {
        e.preventDefault();
        console.log(`this clicked`)
        const newFolder = (({ name }) => ({ name }))(this.state);
        console.log(`this is what the JSON springify does`, JSON.stringify(newFolder))
        const url = 'http://localhost:9090/folders';
        const options = {
            method: 'POST',
            body: JSON.stringify(newFolder),
            headers: {
                "Content-Type": "application/json",
            }
        };
        fetch(url, options)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Something went wrong, please try again later');
                }
                return res.json();
            })
            .then(data => {
                console.log(data)
                this.setState({
                    error:null,
                    id: "",
                    name: "",
                });
                this.context.addFolder(data);
            })
            .catch(err => {
                this.setState({
                    error: err.message
                });
            });
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
    render() {
        const errorMessage = this.state.error ? (<h3>Please retry</h3>) : null
        return (

            <form onSubmit={e => this.handleFolderSubmit(e)}>
                <div className='AddFolderForm'>
                    <h3>Create a Folder</h3>
                    {errorMessage}
                    <label for='name'>Name</label>
                    <input type='text' id='name' name='folderName' onChange={e => this.folderChanged(e.target.value)} />
                    <ValidationError hasError={!this.state.folderValid} message={this.state.validationMessages.name} />
                </div>
                <button className="addFolderButton" type='submit' disabled={!this.state.formValid}>Add Folder</button>
            </form>

        )
    }
}