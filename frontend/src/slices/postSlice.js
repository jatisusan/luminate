import { POST_URL } from "../constants";
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
			query: ({category, keyword}) => ({
				url: POST_URL,
				params: {category, keyword}
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
	}),
});

export const {
	useGetPostQuery,
	useGetPostsQuery,
	useSearchPostQuery,
	useGetCategoryQuery,
	useLikePostMutation,
	useDislikePostMutation,
} = postSlice;
