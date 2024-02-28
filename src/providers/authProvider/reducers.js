import { handleActions } from "redux-actions"; 
import { AuthActionEnums } from './actions';

/**
 * 
 */
export const authReducer = handleActions(
    {
        [AuthActionEnums.setToken]: (state, action) => ({
            ...state,
            token: action.payload.token
        }), // this handler will change the value of the token in the state
        [AuthActionEnums.setProfileImage]: (state, action) => ({
            ...state,
            profileImage: action.payload.profileImage
        }), // this handler will change the value of the profile image url in the state
        [AuthActionEnums.setProfile]: (state, action) => {
            return ({
            ...state,
            profile: action.payload.profile
        })}, // this handler will change the value of the profile object in the state
    },
    {
        token: "", profileImage: "", profile: {}
    } // this is the default state
)