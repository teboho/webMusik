import React, { useEffect, useReducer, useState } from 'react';
import { COMMENT_CONTEXT_INITIAL_STATE, CommentStateContext } from './contexts';
import { commentsReducer } from './reducers';
import { getCommentErrorAction, getCommentRequestAction, getCommentSuccessAction, postCommentErrorAction, postCommentRequestAction, postCommentSuccessAction } from './actions';

/**
 * the state of this context will be an object 
 * but it will pass the access key to its descendants should they need it
 */
function CommentsProvider(props) {
    const [commentState, dispatch] = useReducer(commentsReducer, COMMENT_CONTEXT_INITIAL_STATE);

    // functions for different dispacth calls
    const getComments = (trackId) => {
        dispatch(getCommentRequestAction());
        // make the request
        const url = "http://localhost:5101/api/Comments/GetByTrack/" + trackId; 
        fetch(url)
            .then(data => data.json())
            .then(data => {
                console.log(data);
                // dispatch
                if (data.status > 400) {
                    dispatch(getCommentSuccessAction([]))
                } else {
                    dispatch(getCommentSuccessAction(data))
                }
            })
            .catch(err => {
                console.log(err);
                dispatch(getCommentErrorAction());
            });
    }
    const postComment = (body) => {
        dispatch(postCommentRequestAction());
        // make the request
        const url = "http://localhost:5101/api/Comments/PostComment";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors",
            body: body
        })
        .then(response => {
            if (199 < response < 300) {
                // update the state based on result
                // get new comments
                getComments(JSON.parse(body).trackId);
                dispatch(postCommentSuccessAction());
            }
            response.json()
        })
        .then(data => {
            console.log(data);
        }).catch(err => {
            dispatch(postCommentErrorAction());
            console.log(err);
        });

    }   

    return (
        <CommentStateContext.Provider value={{commentState, getComments, postComment}}>
            {props.children}
        </CommentStateContext.Provider>
    );
}

export default CommentsProvider;