import React, { Component } from "react";
import Note from "./Note";
class NoteList extends Component {
  render() {
    console.log(`these were the props sent to notelist`, this.props.notes)
    return (
      <div className="NoteList">
        <Note notes={this.props.notes}/>
        <button>Add Note</button>
      </div>
    );
  }
}
export default NoteList;
