import React, {useContext} from 'react'
import CartItems from '../components/CartItems'
import { cartData } from '../utils/cartData'
import { CartContext } from '../utils/CartContext'
import withPageLogging from '../utils/PageLogger'
import LogPage from '../utils/LogPage'
import NavBar from '../components/Navbar/Navbar'

const Cart = () => {

  return (
    <div>
      <NavBar/>
      <LogPage page="cart" eventType='VISIT_PAGE' level='1' />
      <CartItems 
      />
    </div>
  )
}
export default Cart
