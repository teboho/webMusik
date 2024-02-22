import { createAction } from 'redux-actions';

export const AuthActionEnums = {
    login: "LOGIN"
};

/**
 * Action takes in the access token and returns an object that contains the access code
 */
export const loginAction = createAction(
    AuthActionEnums.login,
    (accessToken) => ({
        accessToken
    })
);