import { COMMENT_URL } from "../constants";
import { apiSlice } from "./apiSlice";


const commentSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getComments: builder.query({
            query: (id) => ({
                url: `${COMMENT_URL}/${id}`
            }),
            providesTags: ['Comment']
        }),

        addComment: builder.mutation({
            query: (data) => ({
                url: `${COMMENT_URL}/${data.id}`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Comment']
        }),

        addReply: builder.mutation({
            query: (data) => ({
                url: `${COMMENT_URL}/${data.postId}/${data.commentId}`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Comment']
        })
    })
});

export const { useGetCommentsQuery, useAddCommentMutation, useAddReplyMutation } = commentSlice;