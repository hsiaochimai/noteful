import React, { Component } from "react";
import BackButton from '../../BackButton'
import AddFolder from '../Folder/AddFolder'
import PropTypes from 'prop-types'
import '../../App.css';


export default class AddFolderPage extends Component {
    static propTypes={
        history: PropTypes.object.isRequired,
    }
    render() {
        return (
            
            <div className='AddFolderPage'>
            <BackButton history={this.props.history}/>
            <AddFolder />
            
            </div>
            
        )
    }
}
