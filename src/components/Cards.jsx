import React from 'react'
import '../styles/cards.css'
import '../styles/addToCard.css'
import Card from './Card'

export default class Cards extends React.Component {
  render() {
    return (
      <main className='container'>
        <h1 className='category-title'>{this.props.selectedCategory}</h1>
        <div className='cards-list'>
          {this.props.handleData.error && <p>Error</p>}
          {this.props.handleData.loading && <p>Loading</p>}
          {this.props.handleData.data && this.props.handleData.data.category.products.map(product => (
            <>

            <Card key={product.id}
            product={product}
            click={this.props.click}
            selectedCategory={this.props.selectedCategory}
            selected={this.props.selected}
            selectedCurrency={this.props.selectedCurrency}
            setSelectedCurrency={this.props.setSelectedCurrency}
            amount={this.props.amount}
            setAmount={this.props.setAmount}
            handleSelectedProductDetails={this.props.handleSelectedProductDetails}
            selectedProductPage={this.props.selectedProductPage}
            setSelectedProductPage={this.props.setSelectedProductPage} 
            />
            
            </>
          ))}
        </div>
      </main>
    )
  }
}
