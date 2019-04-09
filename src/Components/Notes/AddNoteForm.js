import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom"
import BackButton from '../../BackButton'
import '../../App.css'
import NotefulContext from '../../NotefulContext'
class AddNoteForm extends Component{
    static contextType= NotefulContext
    render(){
        let folders=this.context.folders.map(folder=>{
        return <option value={folder.id}>{folder.name}</option>
        })
        return(
            
            <form>
                <div className='AddFolderForm'>
                    <h3>Create a Note</h3>
                        <label for ='name'>Name</label>
                        <input type='text' id='name' name='noteName'/>
                        <br/>
                        Content:
                        <textarea/>
                        <br/>
                        Folders:
                        <select>
                            {folders}
                        </select>
                </div>
                <button type='submit'>Add Note</button>
            </form>
            
        )
    }
                
        }
export default AddNoteForm