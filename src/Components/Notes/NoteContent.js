import React, {Component} from 'react'
import PropTypes from 'prop-types' 
import '../../App.css'
class NoteContent extends Component{
  static propTypes={
    notes: PropTypes.array.isRequired,
  }
    render(){
        console.log(`this is in the note content`,this.props.notes)
        let noteContent=this.props.notes.map(note=>{
            return(
                <p key={note.id}>
                  {note.content}  
                </p>
           )
        })
        return(
          <div className='noteContent'>
          {noteContent}
          </div>
        )
    }

}
export default NoteContent