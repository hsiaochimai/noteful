import React from 'react'
const NotefulContext =React.createContext(
    {
      folders :[],
      notes: [],
      currentFolder: null,  
    }
)
export default NotefulContext;