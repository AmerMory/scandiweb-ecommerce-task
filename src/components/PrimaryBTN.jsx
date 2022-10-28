import React from "react";

export default class PrimaryBTN extends React.Component {
    state = {}
    render() {
        return (
            <>
                {this.props.handleAddToCart ?
                    <>
                        {
                            this.props.data.data.category.products.map(product => (
                                <>
                                    {
                                        product.id === this.props.url &&
                                        <button key={Math.random()} type="button" className="btn primary-btn" onClick={this.props.handleAddToCart(product, `${product.prices.map(price => this.props.selectedCurrency === price.currency.symbol ? this.amount = price.amount : null)}`)}>{this.props.text}</button>
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
