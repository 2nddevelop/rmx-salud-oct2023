import React, { useState } from 'react'

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
    const [price, setPrice] = useState('');
    return (
        <AppContext.Provider value={{ price, setPrice }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;