import React from 'react'
import CheckoutItems from '../components/CheckoutItems'
import { cartData } from '../utils/cartData'
import LogPage from '../utils/LogPage'
import NavBar from '../components/Navbar/Navbar'

const Checkout = () => {
  return (
    <div>
      <NavBar/>
      <LogPage page="checkout" eventType='VISIT_PAGE' level='1' />
        <CheckoutItems/>
    </div>
  )
}

export default Checkout