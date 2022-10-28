import React from "react";
import Cards from "./components/Cards";
import Navbar from "./components/Navbar";
import ShoppingCart from "./components/ShoppingCart";
import ProductDetails from "./components/ProductDetails";
import { useQuery, gql } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const GET_PRODUCTS = gql`
query {
	category {
    name
    products {
      id
      name
      inStock
      gallery
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          symbol
        }
        amount
      }
    }
  }
  currencies {
    label
    symbol
  }
  categories {
    name
  }
}
`

const ddAddedItem = JSON.parse(localStorage.getItem('selected') || '[]');
const Currency = JSON.parse(localStorage.getItem('selectedCurrency') || '"$"');

function App() {

  const { error, loading, data } = useQuery(GET_PRODUCTS);
  const [apiData, setApiData] = React.useState({
    data: data,
    loading: loading,
    error: error,
  });

  React.useEffect(() => {
    setApiData({
      data: data,
      loading: loading,
      error: error,
    })
  }, [data, loading, error]);

  const [selectedCategory, setSelectedCategory] = React.useState('all');

  const [cartNumber, setCartNumber] = React.useState(0);

  const [selectedCurrency, setSelectedCurrency] = React.useState(Currency);
  React.useEffect(() => {
    localStorage.setItem("selectedCurrency", JSON.stringify(selectedCurrency));
  }, [selectedCurrency]);

  const [amount, setAmount] = React.useState(0);

  React.useEffect(() => {
    localStorage.setItem("cartNumber", JSON.stringify(cartNumber));
  }, [cartNumber]);

  const [selected, setSelected] = React.useState(ddAddedItem);

  React.useEffect(() => {
    localStorage.setItem("selected", JSON.stringify(selected));
  }, [selected]);

  const handleClick = (item, amount) => () => {
    if (!selected.some(s => s[0].id === item.id)) {
      setSelected([...selected,
      [
        item,
        ...selectedCurrency,
        { amount: parseFloat(amount.replace(/,/g, '')) },
        { qty: 1 },
      ]
      ]);
      setCartNumber(cartNumber + 1);
    }
  }

  const [yesNo, setYesNo] = React.useState([]);
  const handleYesNo = (name, id) => {
    if (!yesNo.some(item => item.name === name && item.id !== id)) {
        setYesNo([...yesNo, { name, id }])
    } else {
      setYesNo(yesNo.filter(item => item.name !== name && item.id !== id))
    }
}

  const [cartHoverd, setCartHoverd] = React.useState(false);

  const handleMouseOverCart = () => {
    setCartHoverd(true);
  }

  const handleMouseOutCart = () => {
    setCartHoverd(false);
  }

  const [selectedProductDetails, setSelectedProductDetails] = React.useState([]);

  const handleSelectedProductDetails = (productId, price) => {
      setSelectedProductDetails(productId, price)
  }

  const [selectedProductPage, setSelectedProductPage] = React.useState('');

  const [totalPrice, setTotalPrice] = React.useState(0);

  const handleTotalPrice = () => {
    let total = 0;
    selected.forEach(item => {
        total += item[2].amount * item[3].qty;
    } )
    setTotalPrice(total);
}

  return (
    <Router>
      <div className="App">
        <Navbar
          handleData={apiData}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          cartNumber={cartNumber}
          setCartNumber={setCartNumber}
          selectedCurrency={selectedCurrency}
          setSelectedCurrency={setSelectedCurrency}
          yesNo={yesNo}
          handleYesNo={handleYesNo}
          setYesNo={setYesNo}
          selected={selected}
          setSelected={setSelected}
          handleHover={handleMouseOverCart}
          handleLeave={handleMouseOutCart}
          hoverd={cartHoverd}
          handleTotalPrice={handleTotalPrice}
          totalPrice={totalPrice}
        />

        {cartHoverd === true && <div className="overlay"></div> }


        <Routes>
        <Route path="/" element={<Cards
          handleData={apiData}
          selectedCategory={selectedCategory}
          selected={selected}
          selectedCurrency={selectedCurrency}
          setSelectedCurrency={setSelectedCurrency}
          handleSelectedProductDetails={handleSelectedProductDetails}
          selectedProductPage={selectedProductPage}
          setSelectedProductPage={setSelectedProductPage}
          amount={amount}
          setAmount={setAmount}
          click={handleClick}
          cartHoverdEffect={cartHoverd && "cart-hoverd"}
          cartHoverd={cartHoverd}
        />} />

        <Route path="/shopping-cart" element={<ShoppingCart
        handleData={apiData}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        cartNumber={cartNumber}
        setCartNumber={setCartNumber}
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
        yesNo={yesNo}
        handleYesNo={handleYesNo}
        setYesNo={setYesNo}
        selected={selected}
        setSelected={setSelected}
        handleHover={handleMouseOverCart}
        handleLeave={handleMouseOutCart}
        hoverd={cartHoverd}
        handleTotalPrice={handleTotalPrice}
        totalPrice={totalPrice}
        />} />

        <Route path="/:productID" element={<ProductDetails
        selectedCurrency={selectedCurrency}
        data={apiData}
        selected={selected}
        selectedProductDetails={selectedProductDetails}
        click={handleClick}
        yesNo={yesNo}
        setYesNo={setYesNo}
        handleYesNo={handleYesNo}
        />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
