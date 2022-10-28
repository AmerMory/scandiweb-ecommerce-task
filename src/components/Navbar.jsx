import React from 'react'
import logo from "../images/a-logo.svg";
import '../styles/nav.css';
import shoppingCart from '../images/shopping-cart.svg';
import DropdownCart from "./DropdownCart";
import DropDown from "./DropDown";
import { Link } from "react-router-dom";

export default function Navbar(props) {
    const {totalPrice, handleTotalPrice, handleData, selected, cartNumber, handleHover, handleLeave, hoverd, setCartNumber, selectedCategory, setSelectedCategory, setSelected, handleProductCount, selectedCurrency, setSelectedCurrency, productCount, setProductCount, yesNo, setYesNo, handleYesNo} = props

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
                {handleData.data && <DropDown handleHover={handleHover} handleData={handleData} item={handleData.data.currencies} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} selected={selected} setSelected={setSelected} /> }
                <div className="shopping-cart" onClick={handleHover} ref={refOne}>
                    <img src={shoppingCart} alt="shopping Cart" />
                    {cartNumber > 0 ? <span className="cart-number">{cartNumber}</span> : null}
                    {hoverd === true ? <DropdownCart handleTotalPrice={handleTotalPrice}
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
                    /> : null}
                </div>
            </div>
        </nav>
    )
}
