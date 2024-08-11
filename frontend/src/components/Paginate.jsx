import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({ page, pages, category = "", keyword = "" }) => {
	return (
		pages > 1 && (
			<Pagination>
				<Pagination.First
					href={
						category
							? `/category/${category}/page/1`
							: keyword
							? `/search/${keyword}/page/1`
							: `/page/1`
					}
					disabled={page == 1}
				/>

				<Pagination.Prev
					href={
						category
							? `/category/${category}/page/${page - 1}`
							: keyword
							? `/search/${keyword}/page/${page - 1}`
							: `/page/${page - 1}`
					}
					disabled={page == 1}
				/>

				{[...Array(pages).keys()].map((x) => (
					<LinkContainer
						key={x + 1}
						to={
							category
								? `/category/${category}/page/${x + 1}`
								: keyword
								? `/search/${keyword}/page/${x + 1}`
								: `/page/${x + 1}`
						}
					>
						<Pagination.Item active={page == x + 1}>{x + 1}</Pagination.Item>
					</LinkContainer>
				))}

				<Pagination.Next
					href={
						category
							? `/category/${category}/page/${page + 1}`
							: keyword
							? `/search/${keyword}/page/${page + 1}`
							: `/page/${page + 1}`
					}
					disabled={page == pages}
				/>

				<Pagination.Last
					href={
						category
							? `/category/${category}/page/${pages}`
							: keyword
							? `/search/${keyword}/page/${pages}`
							: `/page/${pages}`
					}
					disabled={page == pages}
				/>
			</Pagination>
		)
	);
};

export default Paginate;
