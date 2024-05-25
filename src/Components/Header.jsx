import React from 'react'
import { Navbar,Container, Badge,Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchProduct } from '../redux/productSlice';



function Header({insideHome}) {

  const dispatch = useDispatch()
  const yourWishlist = useSelector(state=>state.wishlistReducer)
  const yourCart = useSelector(state=>state.cartReducer)
  return (
    <div>
        <Navbar expand="lg" className="bg-info w-100 position-fixed top-0" style={{zIndex:'10',height:'15vh'}}>
        <Container>
          <Navbar.Brand>
           <Link to={'/'} style={{textDecoration:'none',color:'black'}} className='fw-bolder'>
               <i className="fa-solid fa-truck-fast pe-2"></i>
               FF Store
           </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className="ms-auto">
            {
              insideHome &&
              <Nav.Link ><input onChange={e=>dispatch(searchProduct(e.target.value.toLowerCase()))} style={{width:'300px'}} type='text' className='p-1 rounded-2 ' placeholder='Search Products Here!!!' /></Nav.Link>
            }
            <Nav.Link ><Link className='fw-bolder' to={'/wishlist'} style={{textDecoration:'none',color:'black'}}><i className="fa-solid fa-heart text-danger"></i> Wishlist <Badge>{yourWishlist?.length}</Badge></Link></Nav.Link>
            <Nav.Link ><Link className='fw-bolder' to={'/cart'} style={{textDecoration:'none',color:'black'}}><i className="fa-solid fa-cart-shopping text-success"></i> Cart <Badge>{yourCart?.length}</Badge></Link></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header