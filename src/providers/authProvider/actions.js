import { createAction } from 'redux-actions';

/**
 * Actions create the payload object for us that will be used to modify the state
 */

export const AuthActionEnums = {
    setToken: "SET_TOKEN",
    setProfileImage: "SET_PROFILE_IMAGE",
    setProfile: "SET_PROFILE_OBJECT",
    setAuthorised: "SET_AUTHORISED"
};

/**
 * Action takes in the code and returns an object that contains the access code
 */
export const setTokenAction = createAction(
    AuthActionEnums.setToken, 
    (token) => {
        return {
            token
        };
    }
);

/**
 * Action takes in the code and returns an object that contains the access code
 */
export const setProfileImageAction = createAction(
    AuthActionEnums.setProfileImage, 
    (profileImage) => {
        return {
            profileImage: profileImage
        };
    }
);

/**
 * Action takes in the code and returns an object that contains the access code
 */
export const setProfileAction = createAction(
    AuthActionEnums.setProfile, 
    (profile) => {
        return {profile};
    }
);

export const setAuthorisedAction = createAction(
    AuthActionEnums.setAuthorised,
    (authorised) => {
        return {authorised};
    }
);
