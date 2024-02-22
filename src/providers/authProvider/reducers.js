import { handleAction } from "redux-actions"; 
import { AuthActionEnums } from './actions';

/**
 * Updates the code in the state
 */
export const loginReducer = handleAction(
    AuthActionEnums.login,
    (state, action) => ({
        ...state,
        code: action.payload.code
    }),
    { code: "", }
)

/**
 * Updates the token in the state
 */
export const tokenReducer = handleAction(
    AuthActionEnums.saveToken,
    (state, action) => ({
        ...state,
        token: action.payload.token
    }),
    { token: "", }
)