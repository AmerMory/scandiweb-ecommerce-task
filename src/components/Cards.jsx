import React from 'react'
import '../styles/cards.css'
import '../styles/addToCard.css'
import Card from './Card'

export default class Cards extends React.Component {

        state = {
        products: [],
        currentPage: 1,
        productsPerPage: 6,
        currentProducts: [],
        pageNumber: [],
        cardHeight: 0,
        seeMoreNumber: 2,
        };

        componentDidUpdate(prevProps, prevState) {
          const indexOfLastProduct = this.state.currentPage *  this.state.productsPerPage ;
          const indexOfFirstProduct = indexOfLastProduct -  this.state.productsPerPage;
          const currentProducts = this.state.products.slice(indexOfFirstProduct, indexOfLastProduct);

          const pageNumber = [];

          if (this.state.products.length === 0 && this.props.handleData.data) {
            this.setState({
              products: this.props.handleData.data.category.products,
            })
          }

          if (this.state.currentProducts.length === 0 && this.props.handleData.data) {
            for (let i = 1; i <= Math.ceil(this.state.products.length / this.state.productsPerPage); i++) {
              pageNumber.push(i);
            }
            this.setState({
              pageNumber: pageNumber
            })
          this.setState({
            currentProducts: currentProducts
          })
        }

        const card = document.querySelector('.card');
        if (this.props.handleData.loading === false && this.state.cardHeight === 0) {
          let cardHeightValue = card.offsetHeight;
          this.setState({ cardHeight: cardHeightValue });
          }

      }

      componentDidMount() {
        const card = document.querySelector('.card');
        if (this.props.handleData.loading === false && this.state.cardHeight === 0) {
          let cardHeightValue = card.offsetHeight;
          this.setState({ cardHeight: cardHeightValue });
          }
      }

    
    render() {
      
      const cardHeightValue = {
        'overflow': 'hidden',
        'height': this.state.cardHeight * this.state.seeMoreNumber + 60 + 'px',
      }

     const handleSeeMore = () => {
      if (this.state.seeMoreNumber <= this.state.pageNumber.length) {
        this.setState({ seeMoreNumber: this.state.seeMoreNumber + 1 });
        console.log(this.state.seeMoreNumber);
        }
        
      }
      
    return (
      <main className='container'>
        <h1 className='category-title'>{this.props.selectedCategory}</h1>
        <div className='cards-list' style={cardHeightValue}>
          {this.props.handleData.error && <p>Error</p>}
          {this.props.handleData.loading && <p>Loading</p>}
          {this.props.handleData.data && this.props.handleData.data.category.products.map(product => (
            <>

            <Card key={product.id}
            product={product}
            data={this.props.handleData}
            click={this.props.click}
            selectedCategory={this.props.selectedCategory}
            selected={this.props.selected}
            selectedCurrency={this.props.selectedCurrency}
            setSelectedCurrency={this.props.setSelectedCurrency}
            amount={this.props.amount}
            setAmount={this.props.setAmount}
            selectedProductDetails={this.props.selectedProductDetails}
            setSelectedProductDetails={this.props.setSelectedProductDetails}
            handleSelectedProductDetails={this.props.handleSelectedProductDetails}
            selectedProductPage={this.props.selectedProductPage}
            setSelectedProductPage={this.props.setSelectedProductPage} 
            />
            
            </>
          ))}
        {/* <nav>
              <ul className='pagination'>
                {this.state.pageNumber.map(number => (
                  <li key={number} className='page-item'>
                    <a onClick={() => this.setState({currentPage: number})} href='!#' className='page-link'>
                      {number}
                    </a>
                  </li>
                ))}
              </ul>
            </nav> */}
        </div>
            <button type='button' className={`see-more btn primary-btn ${this.state.seeMoreNumber > this.state.pageNumber.length && "disabled-btn"}`} onClick={handleSeeMore} >See More</button>
      </main>
    )
  }
}
