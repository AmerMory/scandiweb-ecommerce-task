import React from 'react'

export default function Cart() {
    const isEmpty = true;

    const EmptyCart = () => {
        <h3>Your shopping cart is empty</h3>
    }

    const FilledCart = () => {
        
    }
    
  return (
    <div>
        <div className='toolbar'>
            {isEmpty ? <EmptyCart /> : <FilledCart />}
        </div>
    </div>
  )
}
