import React from 'react'
const NotefulContext =React.createContext(
    {
      folders :[],
      notes: [],
      currentFolder: null, 
      addFolder: ()=>{
      },
      addNote: ()=>{

      },
      deleteNote: ()=>{
        
      },
      updateNote: ()=>{
        
      }
    }
)
export default NotefulContext;