import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlist } from '../redux/wishlistSlice'
import { addToCart } from '../redux/cartSlice'


function View() {
  // state forstoring the items fom loc storage
  const [product,setProduct] = useState({})
// to get the id from the URL path parameter
  const {id} = useParams()
  console.log(product);

  // to get item from locstorage even after refresh, to avoid blank data
  // its a so parse wuth JSON
  useEffect(()=>{
    if(localStorage.getItem("allProducts"))
      {
        const allProducts = JSON.parse(localStorage.getItem("allProducts"))
        setProduct(allProducts.find(item=>item.id == id))
      }
  },[])

  // function and dispatch of handling wishlist
  const userWishlist = useSelector(state=>state.wishlistReducer)
  const dispatch = useDispatch()  
  const handleWishlist = ()=>
    {
      if(userWishlist?.includes(product))
        {
          alert("Product is already in your Wishlist")
        }else{
          dispatch(addToWishlist(product))
        }
    }
  const userCart = useSelector(state=>state.cartReducer)
const handleCart = ()=>
{
  const existingProduct = userCart?.find(item=>item.id==product.id)
  if(existingProduct)
    {
      dispatch(addToCart(product))
      alert("Items are added to your cart!!!")
    }
    else{
      dispatch(addToCart(product))
    }

}
  return (
    
    <>
    <Header/>
    <div className="container-fluid mt-5 d-flex align-items-center">
      <div   className='row  align-items-center' sm={12}  lg={6} >
        <div className='col-lg-5 pt-5' >

        <div className='container pt-5'>
          <img className='w-100 rounded-5' height={'400vh'} src={product?.thumbnail} alt="product image" />
  
        </div>        
        </div>
        <div className='col-lg-1'></div>
        <div className='col-lg-6 pt-5'>
        <div className='container pt-5 '>
          <h4>PID:{product?.id}</h4>
          <h1>{product?.title}</h1>
          <h3 className='fw-bolder text-danger'>${product?.price}</h3>
          <p style={{textAlign:'justify'}}><span className='fw-bolder text-warning'>Description</span> : {product?.description}</p>
          <div className='justify-content-between d-flex mt-3'>
          <Button onClick={handleWishlist} className='btn'> <i className="fa-solid fa-heart-circle-plus text-danger"></i> Add to Wishlist</Button>
          <Button onClick={()=>handleCart(product)} className='btn'> <i className="fa-solid fa-cart-plus text-success"></i> Add to Cart</Button>

          </div>
        </div>
        </div>

      </div>
    </div>
    </>
  )
}

export default View