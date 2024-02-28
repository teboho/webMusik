import React, { useEffect, useReducer, useState } from 'react';
import { COMMENT_CONTEXT_INITIAL_STATE, CommentStateContext } from './contexts';
import { commentsReducer } from './reducers';

/**
 * the state of this context will be an object 
 * but it will pass the access key to its descendants should they need it
 */
function CommentsProvider(props) {
    const [commentState, dispatch] = useReducer(commentsReducer, COMMENT_CONTEXT_INITIAL_STATE);
    return (
        <CommentStateContext.Provider>
            <h1>Comments</h1>
            {props.children}
        </CommentStateContext.Provider>
    );
}

export default CommentsProvider;