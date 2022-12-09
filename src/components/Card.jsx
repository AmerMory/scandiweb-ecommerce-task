import React from 'react'
import whiteShoppingCart from '../images/shopping-cart-white.svg'

export default function Card({ product, click, selectedCategory, selectedCurrency, amount, handleSelectedProductDetails,selectedProductDetails, setSelectedProductDetails, data }) {

    const [hoverd, setHoverd] = React.useState('');
    // const [cardHeight, setCardHeight] = React.useState(0);
    
    // React.useEffect(() => {
    //     if (data.loading === false) {
    //     const card = document.querySelector('.card');
    //     let cardHeightValue = card.offsetHeight;
    //     setCardHeight(cardHeightValue);
    //     console.log(cardHeightValue);            
    //     }

    // }, [cardHeight]);

    const handleMouseOver = (divNum) => () => {
        setHoverd(divNum);
    };

    const handleMouseOut = () => {
        setHoverd();
    };

    React.useEffect(() => {
        localStorage.setItem("selectedProductDetails", JSON.stringify(selectedProductDetails));
      }, [selectedProductDetails]);

    // console.log(product.prices.map(price => selectedCurrency === price.currency.symbol && price.amount));

    return (
        <div className={`card  ${product.inStock === false ? 'empty-card' : ''}`} style={selectedCategory !== product.category && selectedCategory !== 'all' ? { "display": "none" } : null} key={product.id} onMouseOver={handleMouseOver(product.id)} onMouseOut={handleMouseOut}>
            {hoverd === product.id && product.inStock === true ?

                <div className='add-to-card' onClick={click(product, `${product.prices.map(price => selectedCurrency === price.currency.symbol ? amount = price.amount : null)}`, `${product.id}` )}>
                    <img src={whiteShoppingCart} alt='add to cart' />
                </div>

                : null}

            <a href={product.id}  onClick={()=> handleSelectedProductDetails(product.id, `${product.prices.map(price => selectedCurrency === price.currency.symbol && price.amount)}`)}>
                
                <div className='card-image-container'>
                    <img src={product.gallery[0]} alt={product.name} className="card-image" />
                </div>

                <div className='card-info'>
                    <h3>
                        {product.name}
                    </h3>
                    {product.prices.map(price =>
                        <>
                            <span key={Math.random()} id='span'>{selectedCurrency === price.currency.symbol && `${selectedCurrency}${price.amount}`}</span>
                        </>
                    )}
                </div>
            </a>
        </div>
    )
}
