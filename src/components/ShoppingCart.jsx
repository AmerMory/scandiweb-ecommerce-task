import React, { Component } from 'react'
import DDCartItem from './DDCartItem'
import '../styles/shoppingCart.css'

export default class ShoppingCart extends Component {

  componentDidMount() {
    this.props.handleTotalPrice();
}

componentDidUpdate(prevProps, prevState) {
    if (this.props.cartNumber !== prevProps.cartNumber) {
        this.props.handleTotalPrice();
    }
}

handleRemove = (id) => {
  this.props.setSelected(prevState => prevState.filter(item => item[0].id !== id) )
}

  render() {
    
    return (
      <div className='container'>
        <h1 className='page-title'>Cart</h1>
        {this.props.cartNumber !== 0 ? (
          <section className='shopping-cart-page'>
        {this.props.selected.map(cartItem => (
          <>
          <hr style={{opacity:"0.3"}}/>
          <DDCartItem cartItem={cartItem} key={cartItem[0].id} productName={true} controllers={true} id={cartItem[0].id} handleRemove={this.handleRemove} data={this.props} title={cartItem[0].name} img={cartItem[0].gallery[0]} yesNo={this.props.yesNo} setYesNo={this.props.setYesNo} handleYesNo={this.props.handleYesNo} />
          </>
        ))}
        <hr style={{opacity:"0.3"}}/>
        <div className='total'>
          <p>Quantity: <span>{this.props.cartNumber}</span></p>
          <p id='total'>Total: <span>{this.props.selectedCurrency}{Math.round(this.props.totalPrice * 100) / 100}</span></p>
          <button type='button' className='btn primary-btn' >Order</button>
        </div>
        </section>
        ) : (<h1 className='empty-shopping-cart-page'>Your Shopping Cart Is Empty</h1>)}
        
      </div>
    )
  }
}

