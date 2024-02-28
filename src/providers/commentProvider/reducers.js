import { handleActions } from "redux-actions"; 
import { CommentsActionEnums } from './actions';
import { COMMENT_CONTEXT_INITIAL_STATE } from "./contexts";

/**
 * A reducer t
 */
export const commentsReducer = handleActions(
    {
        // this handler will change the value of the isPending in the state
        [CommentsActionEnums.GetCommentRequest]: (state, action) => ({
            ...state,
            isPending: action.payload.isPending
        }),  // this handler will change the value of the isPending in the state
        [CommentsActionEnums.PostCommentRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),  // this handler will change the value of the isSuccess in the state
        [CommentsActionEnums.GetCommentSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }),  // this handler will change the value of the isSuccess in the state
        [CommentsActionEnums.PostCommentSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }),  // this handler will change the value of the isError in the state
        [CommentsActionEnums.GetCommentError]: (state, action) => ({
            ...state,
            ...action.payload
        }),  // this handler will change the value of the isError in the state
        [CommentsActionEnums.PostCommentError]: (state, action) => ({
            ...state,
            ...action.payload
        })
    },
    COMMENT_CONTEXT_INITIAL_STATE
)