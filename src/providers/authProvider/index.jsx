import React, { createContext, useMemo, useReducer, useState } from 'react';
import { loginReducer, tokenReducer } from './reducers';
import { AuthContext } from './contexts'
import { loginAction, saveTokenAction } from './actions';
/**
 * the state of this context will be an object 
 * but it will pass the access key to its descendants should they need it
 */

export default function AuthProvider(props) {
    // Making the state with the reducer
    const [user, dispatch] = useReducer(loginReducer, {code: ""});
    const [tokenObject, dispatchToken] = useReducer(tokenReducer, {token: ""});
    const [stateToken, setStateToken] = useState('');

    const code = useMemo(() => {
        // console.log("Provider state is changing", user.code);
        return user.code;
    }, [user]);

    const token = useMemo(() => {
        // console.log("Provider state is changing", user.code);
        return tokenObject.token;
    }, [tokenObject]);

    /**
     * allow descendants to change the code
     * @param {*} code new code after login
     */
    const setCode = (code) => {
        dispatch(loginAction({
            code
        }));
    };
    
    const saveToken = (token) => {
        dispatchToken(saveTokenAction({
            token
        }));
    };

    function altSave(token) {
        setStateToken(prev => token);
    }

    return (
        <AuthContext.Provider value={{code, setCode, saveToken, token: token, stateToken, altSave}}>
            {props.children}
        </AuthContext.Provider>
    );
}