import { handleAction } from "redux-actions"; 
import { AuthActionEnums } from './actions';

/**
 * Updates the entire state
 */
export const loginReducer = handleAction(
    AuthActionEnums.login,
    (state, action) => ({
        ...state,
        code: action.payload.code,
        token: action.payload.token
    }),
    { code: "", token: ""}
)
/**
 * Updates the code in the state
 */
export const tokenReducer = handleAction(
    AuthActionEnums.login,
    (state, action) => ({
        ...state,
        token: action.payload.token
    }),
    { token: ""}
)
/**
 * Updates the code in the state
 */
export const codeReducer = handleAction(
    AuthActionEnums.changeCode,
    (state, action) => ({
        ...state,
        code: action.payload.code
    }),
    { code: ""}
)