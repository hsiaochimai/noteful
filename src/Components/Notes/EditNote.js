import React, { Component } from "react";
import NotefulContext from "../../NotefulContext";
import ValidationError from "../ValidationErrors/ValidationError";
export default class EditNoteForm extends Component {
  static contextType = NotefulContext;
  state = {
    id: "",
    note_name: "",
    content: "",
    modified: "",
    folder_id: "",
    nameValid: true,
    contentValid: true,

    formValid: null,
    validationMessages: {
      name: "",
      content: ""
    }
  };
  componentDidMount() {
    const noteId = parseInt(this.props.match.params.noteid);
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
  handleChangeName(note_name){
  this.setState(
    {note_name}, ()=>{
      this.validateNoteName(note_name)
    }
  )
  }
  handleChangeContent(content){
    this.setState({content}, ()=>{
      this.validateContent(content)
    })
  }
  validateNoteName(fieldValue) {
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;
    fieldValue = fieldValue.trim();
    if (fieldValue.length === 0) {
      fieldErrors.name = "Note name is required";
      hasError = true;
    } else {
      if (fieldValue.length < 3) {
        fieldErrors.name = "Note name must be at least 3 characters";
        hasError = true;
      } else {
        fieldErrors.name = "";
        hasError = false;
      }
    }
    this.setState(
      {
        validationMessages: fieldErrors,
        nameValid: !hasError
      },
      this.formValid
    );
  }
  validateContent(fieldValue) {
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;
    fieldValue=fieldValue.trim();
    if (fieldValue.length === 0) {
      fieldErrors.content = "Content is required";
      hasError = true;
    } else {
      if (fieldValue.length < 10) {
        fieldErrors.content = "Note content must be at least 10 characters";
        hasError = true;
      } else {
        fieldErrors.content = "";
        hasError = false;
      }
    }
    this.setState(
      {
        validationMessages: fieldErrors,
        contentValid: !hasError
      },
      this.formValid
    );
  }
  formValid() {
    this.setState({
      formValid: this.state.nameValid && this.state.contentValid 
    });
  }
  handleClickCancel = () => {
    this.props.history.push("/");
  };
  handleSubmit = e => {
    e.preventDefault();
    const noteId = this.props.match.params.noteid;
    const { id, note_name, content, modified, folder_id } = this.state;
    const newNote = { id, note_name, content, modified, folder_id };
    console.log(noteId);
    fetch(`http://localhost:8000/api/notes/${noteId}`, {
      method: "PATCH",
      body: JSON.stringify(newNote),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) return res.json().then(error => Promise.reject(error));
      })

      .then(() => {
        this.context.updateNote(newNote);
        this.resetFields(newNote);
        this.props.history.push("/");
      })
      .catch(error => {
        console.error(error);
        this.setState({ error });
      });
  };
  resetFields = newFields => {
    this.setState({
      id: newFields.id || "",
      note_name: newFields.note_name || "",
      content: newFields.content || "",
      modified: newFields.modified || "",
      folder_id: newFields.folder_id || ""
    });
  };
  render() {
    const { note_name, content } = this.state;
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
            onChange={e=>this.handleChangeName(e.target.value)}
          />
          <ValidationError
            hasError={!this.state.nameValid}
            message={this.state.validationMessages.name}
          />
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            type="text"
            name="content"
            required
            value={content}
            onChange={e=>this.handleChangeContent(e.target.value)}
          />
          <ValidationError
            hasError={!this.state.contentValid}
            message={this.state.validationMessages.content}
          />

          <div className="EditNoteButtons">
            <button
              className="cancel"
              type="button"
              onClick={this.handleClickCancel}
            >
              Cancel
            </button>
            <button className="saveButton" 
            type="submit"
            disabled={!this.state.formValid}>
              Save
            </button>
          </div>
        </form>
      </section>
    );
  }
}
