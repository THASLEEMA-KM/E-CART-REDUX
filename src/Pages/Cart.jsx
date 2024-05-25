import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import emptyCart from '../assets/emptyCart.webp'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, decQuantity, incQuantity, removeCart } from '../redux/cartSlice'
import { Link, useNavigate } from 'react-router-dom'




function Cart() {

  const yourCart = useSelector(state=>state.cartReducer)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [cartTotal,setCartTotal] = useState(0)

  useEffect(()=>{
    if(yourCart?.length>0)
      {
        setCartTotal(yourCart?.map(item=>item.totalPrice).reduce((t1,t2)=>t1+t2))
      }
      else{
        setCartTotal(0)
      }
    },[yourCart])

  const handleDecrement = (cart)=>
    {
      if(cart.quantity>1)
        {
          dispatch(decQuantity(cart.id))
        }
        else
        {
          dispatch(removeCart(cart.id))
        }
    }

   
    const checkout = () =>
      {
        dispatch(clearCart())
        alert("Order Placed successfully, Thank you for purchasing with us!!! ")
        navigate('/')
      }

  return (
    <div>
      <Header/>
      <div className='container ' style={{marginTop:'150px'}}>
        <div className="cart">
          <h1 className='text-center'>Cart Summary</h1>
          <div className="row mt-4">
            <div className="col-lg-8">
              <table border={1} className='table shadow rounded'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Image</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th><i class="fa-solid fa-ellipsis"></i></th>
                  </tr>
                </thead>
                <tbody>
                  {
                      yourCart?.length>0?
                      yourCart?.map((cart,index)=>(
                        <tr key={cart?.id}>
                        <td>{index+1}</td>
                        <td>{cart?.title.slice(0,20)}...</td>
                        <td><img width={'50px'} height={'50px'} src={cart?.thumbnail} alt="" /></td>
                        <td>
                         <div className='d-flex'>
                            <button onClick={()=>handleDecrement(cart)} className='btn'><i class="fa-solid fa-minus"></i></button>
                            <input style={{width:'50px'}} value={cart?.quantity} type="text" readOnly className='border rounded fw-bolder me-1 ms-1' />
                            <button onClick={()=>dispatch(incQuantity(cart?.id))} className='btn'><i class="fa-solid fa-plus"></i></button>
                         </div>
                        </td>
                        <td>{cart?.totalPrice}</td>
                        <td><button className='btn' onClick={()=>dispatch(removeCart(cart?.id))}><i className="fa-solid fa-trash text-danger fs-4"></i></button></td>
                      </tr>
                      ))
                      :
                      <div className='w-100 text-center justify-content-center align-items-center '>
                        <img className='text-center' src={emptyCart} alt="" height={'400px'} width={'400px'} />
                        <h1>Your Cart is Empty!!!</h1>
                      </div>
                  
                  }
                </tbody>
              </table>
              <div className="float-end">
                <button onClick={()=>dispatch(clearCart())}  className='btn btn-danger me-2'>EMPTY CART</button>
                <Link to={'/'} className='btn btn-warning '>SHOP MORE</Link>
              </div>
            </div>
            <div className="col-lg-4">
                  <div className="border rounded p-3">
                    <h4>Total Amount : <span className='text-danger'>$ {cartTotal}</span></h4>
                    <hr />
                    <div className='d-grid'>
                        <button onClick={checkout} className='btn btn-success'>Checkout</button>
                    </div>
                  </div>
            </div>
          </div>
          
        </div>

      </div>
      
      </div>
  )
}

export default Cart