import React, { Component } from 'react';
import Folder from './Folder'
class FolderList extends Component{
    render(){
        console.log(`these were the props passed to Folderlist`, this.props.folders)
        return(
            <div className='Folderlist'>
            <Folder folders={this.props.folders}/>
            </div>
        )
    }
}
export default FolderList