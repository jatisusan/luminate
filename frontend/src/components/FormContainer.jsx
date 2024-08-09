import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({children}) => {
  return (
      <Container className='my-3 py-4'>
          <Row className='justify-content-md-center'>
              <Col xs='12' md='5'>
              {children}
              </Col>
          </Row>
    </Container>
  )
}

export default FormContainer;