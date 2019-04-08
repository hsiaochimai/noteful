import React from 'react';
import {Link} from 'react-router-dom'
import "./App.css"
export default function AddFolder(){
    return <div className='addFolder'>
        <Link to="/addFolder">
            <button>Add Folder</button>
        </Link>
        </div>
}