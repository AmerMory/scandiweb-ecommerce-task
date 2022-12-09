import React from "react";

export default class PrimaryBTN extends React.Component {
    state = {}
    render() {
        // console.log(this.props.selectedProduct.attributes.map(item => item.items.some(item => item.id === 'Yes')));
        return (
            <>
                {this.props.handleAddToCart ?
                    <>
                        {
                            this.props.data.data.category.products.map(product => (
                                <>
                                    {
                                        product.id === this.props.url ?
                                        <button key={Math.random()} type="button" className="btn primary-btn" onClick={this.props.handleAddToCart(product, `${product.prices.map(price => this.props.selectedCurrency === price.currency.symbol ? this.amount = price.amount : null)}`)}>{this.props.text}</button>
                                        : product.id === this.props.url && this.props.selectedProduct.attributes.map(item => item.items.some(item => item.id === 'Yes')) &&
                                        <button key={Math.random()} type="button" className="btn primary-btn" disabled>{this.props.text}</button>
                                    }
                                </>
                            ))
                        }
                    </>
                    : null}
            </>
        );
    }
}
