import { createAction } from 'redux-actions';

export const AuthActionEnums = {
    login: "LOGIN",
    saveToken: "SAVE_ACCESS_TOKEN"
};

/**
 * Action takes in the code and returns an object that contains the access code
 */
export const loginAction = createAction(
    AuthActionEnums.login, 
    ({code}) => {
        return {
            code
        }
    }
);

/**
 * Action takes in the code and returns an object that contains the access code
 */
export const saveTokenAction = createAction(
    AuthActionEnums.saveToken, 
    ({token}) => {
        return {
            token
        }
    }
);

