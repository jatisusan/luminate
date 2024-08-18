import React from 'react'
import { useGetAllCommentsQuery } from '../../slices/commentSlice'
import Spinner from "react-bootstrap/Spinner";
import { Container, Table } from 'react-bootstrap';


const CommentListPage = () => {

    const { data: comments, isLoading, error } = useGetAllCommentsQuery();

  return (
      <>
          {
              isLoading ? (
                <Row className="d-flex justify-content-center mt-4 gap-2">
                <Spinner animation="grow" variant="warning" />
                <Spinner animation="grow" variant="warning" />
                <Spinner animation="grow" variant="warning" />
            </Row>
              ) : (
                      <Container className='mt-3'>
                          <Table responsive hover>
                              <thead>
                                  <tr>
                                      <th>Id</th>
                                      <th>Content</th>
                                      <th>Author</th>
                                      <th>Post</th>
                                      <th>Posted On</th>
                                  </tr>
                              </thead>

                              <tbody>
                                  {
                                      comments.map(comment => (
                                          <tr key={comment._id}>
                                              <td>{comment._id}</td>
                                              <td>{comment.content}</td>
                                              <td>{comment.author.username}</td>
                                              <td>{comment.post}</td>
                                              <td>{comment.createdAt.substring(0,10)}</td>
                                          </tr>
                                      ))
                                  }
                              </tbody>
                          </Table>
                     </Container> 
              )
      }
      </>
  )
}

export default CommentListPage