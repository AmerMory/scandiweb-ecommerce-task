import React from 'react'
import logo from "../images/a-logo.svg";
import '../styles/nav.css';
import shoppingCart from '../images/shopping-cart.svg';
import DropdownCart from "./DropdownCart";
import DropDown from "./DropDown";
import { Link } from "react-router-dom";

export default function Navbar(props) {
    const {totalPrice, handleTotalPrice, handleData, selected, cartNumber, handleHover, handleLeave, hoverd, setCartHoverd, setCartNumber, selectedCategory, setSelectedCategory, setSelected, handleProductCount, selectedCurrency, setSelectedCurrency, productCount, setProductCount, yesNo, setYesNo, handleYesNo} = props

    const refOne = React.useRef(null);


    React.useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClickOutside = (e) => {
        if (!refOne.current.contains(e.target)) {
            handleLeave();
        }
    }

    React.useEffect(() => {
        const cartNumber = JSON.parse(localStorage.getItem('cartNumber'));
        if (cartNumber) {
            setCartNumber(cartNumber)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);    

    const preventDefault = (e) => {
        e.preventDefault();
    }

    const shoppingCartClicked = () => {
        handleHover()
    }


    React.useEffect(() => {
        if (document.getElementById('view-bag-btn') !== null) {        
            const viewBag = document.getElementById('view-bag-btn')
            viewBag.addEventListener('click', handleLeave);
        }
    })
    
    return (
        <nav className="nav-bar">
            {handleData.error && <p>Error</p>}
            {handleData.loading && <p>Loading</p>}
            <ul className="nav-ul">
                {handleData.data && handleData.data.categories.map(category => (
                    <li className={`${selectedCategory === category.name ? 'active-link' : ''} ${category.name === "all" && selectedCategory === '' ? 'active-link' : ""}`} key={category.name} onClick={() => setSelectedCategory(category.name)}><a href={category.name} onClick={preventDefault}>{category.name}</a></li>
                ))}
            </ul>
            <Link to="/"><img src={logo} alt="logo" /></Link>
            <div className="icons">
                {handleData.data &&
                <DropDown handleHover={handleHover} handleData={handleData} item={handleData.data.currencies} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} selected={selected} setSelected={setSelected} />
                }
                <div className="shopping-cart" onClick={() => shoppingCartClicked()} ref={refOne}>
                    <div className='shopping-cart-icon'>
                        <img src={shoppingCart} alt="shopping Cart" id='shopping-cart-icon'/>
                        {cartNumber > 0 ? <span className="cart-number">{cartNumber}</span> : null}
                    </div>
                    {hoverd === true ?
                    <DropdownCart handleTotalPrice={handleTotalPrice}
                    totalPrice={totalPrice}
                    selectedCurrency={selectedCurrency}
                    cartNumber={cartNumber}
                    setCartNumber={setCartNumber}
                    selected={selected}
                    setSelected={setSelected}
                    handleData={handleData}
                    handleProductCount={handleProductCount}
                    productCount={productCount}
                    setProductCount={setProductCount}
                    yesNo={yesNo}
                    setYesNo={setYesNo}
                    handleYesNo={handleYesNo}
                    hoverd={hoverd}
                    setCartHoverd={setCartHoverd}
                    handleLeave={handleLeave}
                    /> : null}
                </div>
            </div>
        </nav>
    )
}
