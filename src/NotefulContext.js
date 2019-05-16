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
        
      },
      deleteFolder: ()=>{
        
      },
      updateFolder: ()=>{

      }
    }
)
export default NotefulContext;