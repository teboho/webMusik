import { handleAction } from "redux-actions"; 
import { AuthActionEnums } from './actions';

/**
 * Updates the accessToken in the state
 */
export const loginReducer = handleAction(
    AuthActionEnums.login,
    (state, action) => ({
        ...state,
        accessToken: action.payload.accessToken
    }),
    {
        accessToken: ""
    }
)