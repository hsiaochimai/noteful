import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import AddNoteForm from './AddNoteForm'
import BackButton from '../../BackButton'
import PropTypes from 'prop-types'
import '../../App.css'
class AddNotePage extends Component {
    static propTypes={
        history: PropTypes.object.isRequired,
    }
    render() {
        return (
            <div className='AddNotePage'>
                    <BackButton history={this.props.history} />
                    <AddNoteForm />
            </div>
        )
    }
}

export default AddNotePage