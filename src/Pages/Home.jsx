import React, { useEffect } from 'react'
import Header from '../Components/Header'
import { Row,Col,Card,Spinner} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../redux/productSlice'

function Home() {

  const {allProducts,error,loading} = useSelector(state=>state.productReducer)
  
  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(fetchProducts())
  },[])

  return (
    <>
      <Header insideHome={true}/>
      <div className="container-fluid" style={{marginTop:'150px'}}>
        {
          loading ?
          <div className="text-center mt-5 fw-bolder fs-1">
            <Spinner animation="border" variant="primary" /> Loading......
          </div>
          :
          <Row className='my-5' sm={12} md={6} lg={4} xl={4}>
            { 
              allProducts?.length>0 ?
              
              allProducts?.map(product=>
               (
                  <Col key={product?.id} className='mb-5'>
                    <Card className='shadow rounded '  style={{ width: '20rem' }}>
                      <Card.Img height={'180px'} variant="top" src={product?.thumbnail} />
                      <Card.Body>
                        <Card.Title>{product?.title.slice(0,20)}...</Card.Title>
                        <div className='mt-m text-center'>
                          <Link to={`/${product?.id}/view`}>View More....</Link>
                        </div>
                      </Card.Body>
                    </Card>
                    </Col>
                )
              )
              :
              <div className='text-center fw-bolder text-danger my-5'>Products Not Found!!!</div>
                
            }
          </Row>
        
        }
      </div>
      

    </>
  )
}

export default Home