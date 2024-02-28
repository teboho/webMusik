import { createContext } from "react"; 

export const COMMENT_CONTEXT_INITIAL_STATE = {
    isInProgress: false,
    isSuccess: false,
    isError: false,
    comments: []
}

export const CommentStateContext = createContext(COMMENT_CONTEXT_INITIAL_STATE);