import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './App.css'
class BackButton extends Component{
    static propTypes= {
        history: PropTypes.object.isRequired,
    }
    render(){
        return<div className='BackButton'>
        <button onClick={()=>this.props.history.goBack()}>
            Back
        </button>
        </div>
    }
    
}
export default BackButton