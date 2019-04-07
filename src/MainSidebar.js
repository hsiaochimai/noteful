import React, {Component} from 'react';
class MainSidebar extends Component{
    render(){
        return <FolderList folders={this.props.data.folders}/>
    }
    
}

export default MainSidebar