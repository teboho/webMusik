import { createAction } from 'redux-actions';

export const AuthActionEnums = {
    login: "LOGIN",
    changeToken: "CHANGE_TOKEN",
    changeCode: "CHANGE_CODE",
};

/**
 * Action takes in the code and returns an object that contains the access code
 */
export const loginAction = createAction(
    AuthActionEnums.login, 
    ({code, token}) => {
        return {
            code,
            token
        }
    }
);

/**
 * Changes only the code
 */
export const changeCodeAction = createAction(
    AuthActionEnums.changeCode, 
    ({code}) => {
        return {
            code
        }
    }
);

/**
 * Changes only the code
 */
export const changeTokenAction = createAction(
    AuthActionEnums.changeCode, 
    ({token}) => {
        return {
            token
        }
    }
);

