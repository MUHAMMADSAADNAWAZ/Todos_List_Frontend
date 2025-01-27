import React, { useState , createContext } from 'react'

export const ThemeContext = createContext();

const Theme = ({children}) => {

  const [theme, setTheme] = useState('default');
  const [name, setName] = useState('');
  const [userid, setUserid] = useState('');

  return (
    <div>
        <ThemeContext.Provider value={{theme , setTheme , name , setName , userid , setUserid}}>
            {children}
        </ThemeContext.Provider>
    </div>
  )
}

export default Theme