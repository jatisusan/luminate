import { POST_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const postSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getPost: builder.query({
			query: (id) => ({
				url: `${POST_URL}/${id}`,
			}),
			providesTags: ["Post"],
		}),

		getPosts: builder.query({
			query: ({category, keyword, pageNumber}) => ({
				url: POST_URL,
				params: {category, keyword, pageNumber}
			}),
		}),

		searchPost: builder.query({
			query: (filter) => ({
				url: `${POST_URL}/search?query=${filter}`,
			}),
		}),

		getCategory: builder.query({
			query: (category) => ({
				url: `${POST_URL}/category/${category}`,
			}),
		}),

		likePost: builder.mutation({
			query: (id) => ({
				url: `${POST_URL}/${id}/like`,
				method: "PUT",
				body: id,
			}),
			invalidatesTags: ["Post"],
		}),

		dislikePost: builder.mutation({
			query: (id) => ({
				url: `${POST_URL}/${id}/dislike`,
				method: "PUT",
				body: id,
			}),
			invalidatesTags: ["Post"],
		}),

		getMyPosts: builder.query({
			query: () => ({
				url: `${POST_URL}/myposts`
			}),
			providesTags: ['Post']
		}),

		uploadPostImage: builder.mutation({
            query: (data) => ({
                url: UPLOAD_URL,
                method: 'POST',
                body: data
            })
		}),
		
		createPost: builder.mutation({
			query: (data) => ({
				url: `${POST_URL}/create`,
				method: 'POST',
				body: data
			})
		}),

		deletePost: builder.mutation({
			query: (id) => ({
				url: `${POST_URL}/${id}`,
				method: 'DELETE',
				body: id
			}),
			invalidatesTags: ['Post']
		}),

		updatePost: builder.mutation({
			query: (data) => ({
				url: `${POST_URL}/${data.id}`,
				method: 'PUT',
				body: data
			}),
			invalidatesTags: ['Post']
		}),

		getTopPosts: builder.query({
			query: () => ({
				url: `${POST_URL}/top-posts`,
			})
		})
	}),
});

export const {
	useGetPostQuery,
	useGetPostsQuery,
	useSearchPostQuery,
	useGetCategoryQuery,
	useLikePostMutation,
	useDislikePostMutation,
	useGetMyPostsQuery,
	useUploadPostImageMutation,
	useCreatePostMutation,
	useDeletePostMutation,
	useUpdatePostMutation, 
	useGetTopPostsQuery
} = postSlice;
