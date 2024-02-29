import React, { useEffect, useReducer, useState } from 'react';
import { COMMENT_CONTEXT_INITIAL_STATE, CommentStateContext } from './contexts';
import { commentsReducer } from './reducers';
import { getCommentErrorAction, getCommentRequestAction } from './actions';

/**
 * the state of this context will be an object 
 * but it will pass the access key to its descendants should they need it
 */
function CommentsProvider(props) {
    const [commentState, dispatch] = useReducer(commentsReducer, COMMENT_CONTEXT_INITIAL_STATE);

    // functions for different dispacth calls
    const getCommentsPending = () => {
        dispatch(getCommentRequestAction());
    }
    const postCommentsPending = () => {
        dispatch(postCommentsPending());
    }
    const getCommentsError = () => {
        dispatch(getCommentErrorAction());
    }


    return (
        <CommentStateContext.Provider value={{commentState, }}>
            <h1>Comments</h1>
            {props.children}
        </CommentStateContext.Provider>
    );
}

export default CommentsProvider;