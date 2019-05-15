import React, { Component } from 'react';
import Folder from './Folder'
import PropTypes from 'prop-types'
import '../../App.css'
class FolderList extends Component{
static propTypes={
    folders: PropTypes.array.isRequired,
}
    render(){
        return(
            <div className='Folderlist'>
            <Folder folders={this.props.folders}/>
            </div>
        )
    }
}
export default FolderList