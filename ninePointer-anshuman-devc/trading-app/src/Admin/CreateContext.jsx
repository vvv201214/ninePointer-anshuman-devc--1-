import React, { useState } from 'react'


export const userContext = React.createContext();
export default function AuthContext({children}) {
    const [preTrade, setPreTrade] = useState({
      index:"",
      ce:"",
      pe:""
    });
    
  return (
      <userContext.Provider value={{preTrade, setPreTrade}}>
        {children}
      </userContext.Provider>
  )
}