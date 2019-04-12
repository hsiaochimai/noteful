import React, { Component } from "react";
import BackButton from '../../BackButton'
import AddFolder from '../Folder/AddFolder'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import '../../App.css';


export default class AddFolderPage extends Component {
    render() {
        return (
            
            <div className='AddFolderPage'>
            <ErrorBoundary>
            <BackButton history={this.props.history}/>
            <AddFolder />
            </ErrorBoundary>
            </div>
            
        )
    }
}
