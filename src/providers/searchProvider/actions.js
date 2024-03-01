import { createAction } from 'redux-actions';

/**
 * Actions create the payload object for us that will be used to modify the state
 */

export const SearchActionEnums = {
    setToken: "SET_TOKEN",
    setProfileImage: "SET_PROFILE_IMAGE",
    setProfile: "SET_PROFILE_OBJECT",
};

/**
 * Action takes in the code and returns an object that contains the access code
 */
export const setTokenAction = createAction(
    SearchActionEnums.setToken, 
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
    SearchActionEnums.setProfileImage, 
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
    SearchActionEnums.setProfile, 
    (profile) => {
        return {profile};
    }
);
