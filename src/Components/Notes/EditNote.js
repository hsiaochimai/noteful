import React, {Component} from 'react';
import NotefulContext from '../../NotefulContext';

export default class EditNoteForm extends Component{
    static contextType= NotefulContext
    state = {
      id: "",
      note_name: "",
      content: "",
      modified:"",
      folder_id:"",
      error: null
    };
    componentDidMount() {
        const noteId = parseInt(this.props.match.params.noteid);
        console.log(noteId);
        fetch(`http://localhost:8000/api/notes/${noteId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(res => {
            if (!res.ok) {
              return res.json().then(error => {
                // then throw it
                throw error;
              });
            }
            return res.json();
          })
          .then(resJson => {
            console.log(resJson);
    
            this.setState({
              id: resJson.id,
              note_name: resJson.note_name,
                content: resJson.content,
                modified: resJson.modified,
                folder_id: resJson.folder_id
            });
          })
    
          .catch(error => {
            console.error(error);
            this.setState({ error });
          });
      }
      handleChangeName = e => {
        this.setState({ note_name: e.target.value });
      }
      handleChangeFolder = e => {
        this.setState({ folder_id: e.target.value });
      }
      handleChangeContent = e => {
        this.setState({ content: e.target.value });
      }
      folderIdChanged(folder_id) {
        console.log(`folderId is`,folder_id);
        this.setState(
          {
            folder_id
          }
        
        );
      }
      handleClickCancel = () => {
        this.props.history.push('/')
          }
          handleSubmit = e => {
            e.preventDefault()
            const noteId = this.props.match.params.noteid;
            const {id, note_name,content,modified,folder_id}= this.state
            const newNote = {id, note_name,content,modified,folder_id}
            console.log(noteId);
            fetch(`http://localhost:8000/api/notes/${noteId}`, {
              method: "PATCH",
              body: JSON.stringify(newNote),
              headers: {
                'content-type': 'application/json',
              },
            })
            .then(res=>{
              if(!res.ok)
              return res.json().then(error=>Promise.reject(error))
            
            })
            
            .then(() => {
            this.context.updateNote(newNote)
            this.resetFields(newNote)
            this.props.history.push('/')
            })
            .catch(error => {
              console.error(error)
              this.setState({ error })
            })
        }
        resetFields = (newFields) => {
          this.setState({
            id: newFields.id || '',
            note_name: newFields.note_name || '',
            content: newFields.content || '',
            modified: newFields.modified || '',
            folder_id: newFields.folder_id|| '',
          })
        }
          render() {
            const { note_name, content} = this.state;
            console.log(`edit form rendered`);
            return (
              <section className="EditNoteForm">
                <h2>Edit Note</h2>
                <form className="EditNoteForm" onSubmit={this.handleSubmit}>
                  <div className="EditNote__error" role="alert">
                    {this.state.error && <p>{this.state.error.message}</p>}
                  </div>
                  <label htmlFor="title">Name </label>
                  <input
                    id="note_name"
                    type="text"
                    name="note_name"
                    required
                    value={note_name}
                    onChange={this.handleChangeName}
                  />
                  <label htmlFor="content">Content</label>
                  <textarea
                    id="content"
                    type="text"
                    name="content"
                    required
                    value={content}
                    onChange={this.handleChangeContent}
                  />
    
                  <div classname ='EditNoteButtons'>
                  <button className='cancel'type='button' onClick={this.handleClickCancel}>
                      Cancel
                    </button>
                  <button className='save' type='submit'>
                      Save
                    </button>
                    </div>
                </form>
        
              </section>
            );
          }
        

}