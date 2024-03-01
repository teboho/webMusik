import { createAction } from 'redux-actions';

/**
 * Enums for the actions
 */
export const CommentsActionEnums = {
    GetCommentRequest: "GET_COMMENT_REQUEST",
    GetCommentSuccess: "GET_COMMENT_SUCCESS",
    GetCommentError: "GET_COMMENT_ERROR",

    PostCommentRequest: "POST_COMMENT_REQUEST",
    PostCommentSuccess: "POST_COMMENT_SUCCESS",
    PostCommentError: "POST_COMMENT_ERROR"
}

/**
 * Sets the isPending to true
 * The result is not there yet
 */
export const getCommentRequestAction = createAction(
    CommentsActionEnums.GetCommentRequest,
    () => ({ isSuccess: false, isPending: true, isError: false})
)
/**
 * Sets the isPending to true
 * The results array is not there yet
 */
export const postCommentRequestAction = createAction(
    CommentsActionEnums.PostCommentRequest,
    () => ({ isSuccess: false, isPending: true, isError: false})
)

/**
 * Sets the isSuccess to true but then all else to false
 * and also save the comments array :)
 */
export const getCommentSuccessAction = createAction(
    CommentsActionEnums.GetCommentSuccess,
    (commentsArray) => ({ isSuccess: true, isPending: false, isError: false, comments: [...commentsArray] })
);

/**
 * Sets the isSuccess to true but then all else to false
 */
export const postCommentSuccessAction = createAction(
    CommentsActionEnums.PostCommentSuccess,
    () => ({ isSuccess: true, isPending: false, isError: false })
);

/**
 * Sets the isError to true but then all else to false
 */
export const getCommentErrorAction = createAction(
    CommentsActionEnums.GetCommentError,
    () => ({ isSuccess: false, isPending: false, isError: true, comments: [] })
);

/**
 * Sets the isError to true but then all else to false
 */
export const postCommentErrorAction = createAction(
    CommentsActionEnums.PostCommentSuccess,
    () => ({ isSuccess: false, isPending: false, isError: true })
);