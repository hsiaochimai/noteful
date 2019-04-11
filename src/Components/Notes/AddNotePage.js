import React ,{Component} from 'react'
import {Link} from 'react-router-dom'
import AddNoteForm from './AddNoteForm'
import BackButton from '../../BackButton'

class AddNotePage extends Component{
    render(){
        return(
            <div className='AddNotePage'>
            <BackButton history={this.props.history}/>
            <AddNoteForm />
            </div>
        )
    }
}

export default AddNotePage