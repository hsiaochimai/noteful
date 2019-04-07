import React, {Component} from 'react'
 class NoteContent extends Component{
    render(){
        console.log(`this is in the note content`,this.props.notes)
        let noteContent=this.props.notes.map(note=>{
            return(
                <p>
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