import React, { createContext, useEffect, useMemo, useReducer, useState } from 'react';
import { codeReducer, loginReducer, tokenReducer } from './reducers';
import { AuthContext } from './contexts'
import { loginAction, saveTokenAction } from './actions';
/**
 * the state of this context will be an object 
 * but it will pass the access key to its descendants should they need it
 */

export default function AuthProvider(props) {
    // Making the state with the reducer
    const [userCode, setUserCode] = useState({})// useReducer(codeReducer, {code: ""});
    // const [userToken, setUserToken] = useReducer(tokenReducer, {token: ""});

    /**
     * allow descendants to change the code
     * @param {*} code new code after login
     */
    const changeCode = (newCode) => {
        setUserCode(prev => {
            return {
                ...prev,
                code: newCode
            }
        });
    };

    
    const value = useMemo(() => {
        return {
            code: userCode.code,
            changeCode
        }
    }, [userCode]);


    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
}