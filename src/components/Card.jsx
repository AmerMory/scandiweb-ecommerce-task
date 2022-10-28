import React from 'react'
import whiteShoppingCart from '../images/shopping-cart-white.svg'

export default function Card({ product, click, selectedCategory, selectedCurrency, amount, handleSelectedProductDetails}) {

    const [hoverd, setHoverd] = React.useState('');

    const handleMouseOver = (divNum) => () => {
        setHoverd(divNum);
    };

    const handleMouseOut = () => {
        setHoverd();
    };

    return (
        <div className={`card  ${product.inStock === false ? 'empty-card' : ''}`} style={selectedCategory !== product.category && selectedCategory !== 'all' ? { "display": "none" } : null} key={product.id} onMouseOver={handleMouseOver(product.id)} onMouseOut={handleMouseOut}>
            <div className='card-image-container'>
                <img src={product.gallery[0]} alt={product.name} className="card-image" />
            </div>
            
            {hoverd === product.id && product.inStock === true ?

                <div className='add-to-card' onClick={click(product, `${product.prices.map(price => selectedCurrency === price.currency.symbol ? amount = price.amount : null )}`)}>
                    <img src={whiteShoppingCart} alt='add to cart' />
                </div>

                : null}

            <div className='card-info'>
                <h3>
                    {product.inStock !== false ?
                    <a href={product.id} onClick={handleSelectedProductDetails(product.id, product.prices.map(price => selectedCurrency === price.currency.symbol && price.amount ))}>{product.name}</a>
                    :
                    <p>{product.name}</p>
                    }
                </h3>
                {product.prices.map(price =>
                    <>
                        <span key={Math.random()} id='span'>{selectedCurrency === price.currency.symbol && `${selectedCurrency}${price.amount}`}</span>
                    </>
                )}
            </div>
        </div>
    )
}
