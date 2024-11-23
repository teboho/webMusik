import { createContext } from "react"; 

const defaultAuthState = {
    token: "", profileImage: "", profile: {}, authorised: false
}

export const AuthContext = createContext(defaultAuthState);