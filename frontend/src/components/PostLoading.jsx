import React from "react";
import { Button, Card, Placeholder, Row, Col } from "react-bootstrap";

const PostLoading = ({ num }) => {
	return (
		<>
			{[...Array(num).keys()].map((x) => (
				<Card key={x} className="px-2 my-4">
					<Row>
						<Col>
							<Card.Body>
								<Placeholder as={Card.Title} animation="glow">
									<Placeholder xs={12} md={10} />
								</Placeholder>

								<Placeholder as={Card.Text} animation="glow">
									<Placeholder xs={12} md={10} />
								</Placeholder>

								<Placeholder as={Card.Text} animation="glow">
									<Placeholder xs={12} md={10} />
								</Placeholder>

								<Placeholder.Button variant="warning" xs={3} lg={2} className="mb-3"/>
							</Card.Body>
						</Col>

						<Col sm="4">
							<Placeholder as="div" animation="glow">
								<div
									style={{
										width: "93%",
										height: "165px",
										backgroundColor: "#e0e0e0",
                                    }}
                                    
                                    className="mx-auto my-3"
								/>
							</Placeholder>
						</Col>
					</Row>
				</Card>
			))}
		</>
	);
};

export default PostLoading;
