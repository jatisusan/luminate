import { apiSlice } from "./apiSlice";
import { UPLOAD_URL, USER_URL } from "../constants";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/login`,
                method: 'POST',
                body: data
            })
        }),

        signup: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/signup`,
                method: 'POST',
                body: data
            })
        }),

        userLogout: builder.mutation({
            query: () => ({
                url: `${USER_URL}/logout`,
                method: 'POST'
            })
        }),

        updateProfile: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/profile`,
                method: 'PUT',
                body: data
            })
        }),

        uploadPfp: builder.mutation({
            query: (data) => ({
                url: UPLOAD_URL,
                method: 'POST',
                body: data
            })
        })
    })
});

export const { useLoginMutation, useSignupMutation, useUserLogoutMutation, useUpdateProfileMutation, useUploadPfpMutation } = userApiSlice;