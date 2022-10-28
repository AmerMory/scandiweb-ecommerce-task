import React from 'react'
import '../styles/dropdownCart.css'
import DDCartItem from './DDCartItem';
import { Link } from 'react-router-dom';


export default class DropdownCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItemContainerHeight: 0,
        }
    }

    componentDidMount() {
        this.props.handleTotalPrice();
        const cartItemContainer = document.querySelector('.cart-item-container');
        if (this.props.selected.length >= 3) {

            let cartItemContainerHeight = cartItemContainer.offsetHeight;
            this.setState({ cartItemContainerHeight: cartItemContainerHeight });
            return cartItemContainerHeight;
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.cartNumber !== prevProps.cartNumber) {
            this.props.handleTotalPrice();
        }
    }


    handleRemove = (id) => {
        this.props.setSelected(prevState => prevState.filter(item => item[0].id !== id))
    }

    render() {
        const DDCartItemStyles = {
            'overflow': 'scroll',
            'height': this.state.cartItemContainerHeight * 2 + 'px',
        }

        return (
            <div className="dropdown-cart-items">
                {this.props.cartNumber <= 0

                    ?
                    <span className='empty-cart'>Your Cart Is Empty</span>
                    :
                    <>
                        <h4>My Bag: <span className='bag-count'>{this.props.cartNumber} {this.props.cartNumber > 1 ? "Items" : "Item"}</span></h4>
                        <div className='ddcartItem-container' style={this.props.selected.length > 2 ? DDCartItemStyles : null}>
                            {this.props.selected.map(cartItem => (
                                <DDCartItem cartItem={cartItem} key={cartItem[0].id} id={cartItem[0].id} handleRemove={this.handleRemove} data={this.props} title={cartItem[0].name} img={cartItem[0].gallery[0]} yesNo={this.props.yesNo} setYesNo={this.props.setYesNo} handleYesNo={this.props.handleYesNo} />
                            ))}
                        </div>
                        <div className="total">
                            <p className='p' >Total</p>
                            <p className='total-price'>{this.props.selected[0][1]}{Math.round(this.props.totalPrice * 100) / 100}</p>
                        </div>

                        <div className='buttons-container' >
                            <Link to="/shopping-cart"><button type='button' className='btn secondary-btn' >view bag</button></Link>
                            <button type='button' className='btn primary-btn' >check out</button>
                        </div>
                    </>
                }

            </div>
        )
    }
}

