import React, {Component} from 'react'

class BackButton extends Component{
    render(){
        return<div className='BackButton'>
        <button onClick={()=>this.props.history.goBack()}>
            Back
        </button>
        </div>
    }
    
}
export default BackButton