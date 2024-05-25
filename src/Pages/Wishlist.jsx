import React from 'react'
import Header from '../Components/Header'
import {  Card, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import emptyList from '../assets/EmptyWishlist.png'
import { removeWishlist } from '../redux/wishlistSlice'
import { addToCart } from '../redux/cartSlice'


function Wishlist() {

const yourWishlist = useSelector(state=>state.wishlistReducer)
const yourCart = useSelector(state=>state.cartReducer)
const handleCart = (product) =>
  {
    const existingProduct = yourCart?.find(item=>item.id==product.id)
    if(existingProduct)
      {
        dispatch(addToCart(product))
        dispatch(removeWishlist(product.id))
        alert("Item Quantity Increases!!!")
      }
      else
      {
        dispatch(addToCart(product))
        dispatch(removeWishlist(product.id))
      }
  }

  const dispatch = useDispatch()
  return (
    <div>
      <Header/>
      <div className="container-fluid" style={{marginTop:'150px'}}>
        <h3 className='text-center text-warning'>YOUR WISHLIST</h3>
        <Row className='my-5' sm={12} md={6} lg={4} xl={4}>
         { 
            yourWishlist.length>0?
            yourWishlist?.map(wishlist=>(
              <Col className='mb-5 me-2 ms-3 '>
              <Card className='shadow rounded-3 '  style={{ width: '18rem' }}>
                <Card.Img height={'180px'} variant="top" src={wishlist?.thumbnail} />
                <Card.Body>
                  <Card.Title  className='text-center'>{wishlist?.title.slice(0,20)}...</Card.Title>
                  <div className='mt-m d-flex justify-content-around'>
                    <button onClick={()=>dispatch(removeWishlist(wishlist?.id))} className='btn fs-3'> <i className="fa-solid fa-heart-circle-minus text-danger"></i></button>
                    <button onClick={()=>dispatch(handleCart(wishlist)) } 
                    className='btn fs-3'> <i className="fa-solid fa-cart-plus text-success"></i></button>
                </div>
              </Card.Body>
            </Card>
          </Col>
           ))
           :
           <div className='w-100 text-center justify-content-center align-items-center '>
            
            <img className='text-center' src={emptyList} alt="emptyWishList" height={'400px'} width={'400px'}/>
           
           
           </div>

         }
          
        </Row>
      </div>
    </div>
  )
}

export default Wishlist