import React, {createContext, useState} from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({children})=>{
    const [userInfo, setUserInfo] = useState({});
    const  [adminInfo, setAdminInfo] = useState({});
    return(
        <UserContext.Provider value={{userInfo, setUserInfo, adminInfo, setAdminInfo}}> 
            {children}
        </UserContext.Provider>
     
   
    )
}