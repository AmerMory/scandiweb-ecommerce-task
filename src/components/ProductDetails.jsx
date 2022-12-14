/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from 'react'
import '../styles/productDetails.css'
import PrimaryBTN from './PrimaryBTN'

const selectedProductDetails = JSON.parse(localStorage.getItem('selectedProductDetails'))

export default class ProductDetails extends Component {

  url = selectedProductDetails[0];

  state = {
    selectedProduct: "",
    selectedImage: "",
    productAttributes: [],
    yesNoAttributes: [],
    productData: {
      id: this.url,
      activeSize: '40',
      activeCapacity: '1T',
      activeSwatch: 'White',
      activeYesNo: [
      ],
    },
  }

  

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data.loading === false && this.state.selectedProduct === "") {
      this.setState({
        selectedProduct: this.props.data.data.category.products.find(item => item.id === this.url),
        productAttributes: this.props.data.data.category.products.map(product => product).find(item => item.id === this.url).attributes,
        yesNoAttributes: this.props.data.data.category.products.map(product => product).find(item => item.id === this.url).attributes.filter(att => att.name.includes(' ') === true),
        productData: {
          ...this.state.productData,
          activeYesNo: this.props.data.data.category.products.map(product => product).find(item => item.id === this.url).attributes.filter(att => att.name.includes(' ') === true).map(att => ({ name: att.name, id: 'Yes' })),
        }
      })
    }
    
    if (this.state.productData.id !== localStorage.getItem(`${this.state.productData.id}` && this.state.productData.id === prevState)) {
      localStorage.setItem(`${this.state.productData.id}`, JSON.stringify(this.state.productData))
    }

  }
  
  componentDidMount() {
    const data = JSON.parse(localStorage.getItem(`${this.state.productData.id}`));
    if (data) {
      this.setState({
        productData: data,
      })
    }
  }

  handleSelectedImage(imgSrc) {
    this.setState({
      selectedImage: imgSrc
    })
  }

  handleSize = (e) => {
    this.setState(prevState => ({
      productData: {
        ...prevState.productData,
        activeSize: e
      }
    }))
  }

  handleCapacity = (e, att) => {
    this.setState(prevState => ({
      productData: {
        ...prevState.productData,
        activeCapacity: e
      }
    }))
  }

  handleSwatch = (e) => {
    this.setState(prevState => ({
      productData: {
        ...prevState.productData,
        activeSwatch: e
      }
    }))
  }

  productYesNo = (name, id) => {

    this.setState(prevState => ({

      productData: {
        ...prevState.productData,
        activeYesNo: [
          ...prevState.productData.activeYesNo.filter(item => item.name !== name),
          {
            name: name,
            id: id,
          }
        ]
      }

    }))

  }

  render() {
  
    return (
      <div className='product-details container'>
        {this.props.data.loading === true ? <div>Loading...</div> :
          <>
            {this.state.selectedProduct !== "" ?
              <>
                <div className="product-gallery">
                  {this.state.selectedProduct.gallery.map(img => (
                    <div key={img} onClick={() => this.handleSelectedImage(img)} >
                      <img src={img} alt="product image" />
                    </div>
                  ))
                  }
                </div>
                <div className="product-image"><img src={this.state.selectedImage === "" ? this.state.selectedProduct.gallery[0] : this.state.selectedImage} alt='product image' /> </div>

                <div className="product-data">
                  <h2 className='first-name'>{this.state.selectedProduct.name.split(' ')[0]}</h2>
                  <h2 className='remaining-name'>{this.state.selectedProduct.name.indexOf(this.state.selectedProduct.name.split(' ')[1]) !== -1 ? this.state.selectedProduct.name.slice(this.state.selectedProduct.name.indexOf(this.state.selectedProduct.name.split(' ')[1])) : null}</h2>
                  {this.props.data.data.category.products.map(product => (
                    <>
                    {this.state.productData.id === product.id && 
                    <span className='product-brand'>{product.brand}</span>
                    }
                    </>
                  ))}
                  <div className="attributes-container">
                    {this.state.selectedProduct.attributes.map(attribute =>
                      <>
                       {attribute.name !== 'Color' && 
                        <h4>{attribute.name}:</h4>
                      }
                        <div className='text-container'>
                          {attribute.name === "Size" && attribute !== null ?
                            <>
                              {attribute.items.map(attrItem => <button key={attrItem.id + Math.random()} type='button' className={`data-btn attributes-size ${this.state.productData.activeSize === attrItem.id ? 'active-size' : '' }`} onClick={() => this.handleSize(attrItem.id)} >{attrItem.displayValue}</button>)}
                            </>
                            :
                            attribute.name.length > 10 ?
                              <>
                                {attribute.items.map(attrItem => <button key={attrItem.id + Math.random()} type='button' className={`data-btn attributes-yesNo ${this.state.productData.activeYesNo.some(item => item.id === attrItem.id && item.name === attribute.name) ? 'active-yesNo' : ''}`} onClick={() => this.productYesNo(attribute.name, attrItem.id)} >{attrItem.displayValue}</button>)}
                              </>
                              : attribute.name === "Capacity" ?
                                <>
                                  {attribute.items.map(attrItem => <button key={attrItem.id + Math.random()} type='button' className={`data-btn attributes-capacity ${this.state.productData.activeCapacity === attrItem.id ? 'active-capacity' : ''}`} onClick={() => this.handleCapacity(attrItem.id)} >{attrItem.displayValue}</button>)}
                                </>
                                : null}

                        </div>
                      </>
                    )}
                    <div className="color-container">
                      {this.state.selectedProduct.attributes.map(attribute =>
                        <>
                          {attribute.name === "Color" ?
                            <>
                            <h4>{attribute.name}:</h4>
                              <div key={Math.random()} className="color-buttons">
                                {attribute.items.map(attrItem => <button key={attrItem.id} type='button' className={`data-btn attributes-swatch ${this.state.productData.activeSwatch === attrItem.id ? 'active-swatch' : ''}`} onClick={() => this.handleSwatch(attrItem.id)} style={{ backgroundColor: `${attrItem.value}` }} ></button>)}
                              </div>
                            </>
                            : null}
                        </>
                      )}
                    </div>
                  </div>
                  <div className='price-div'>
                    <h4 className='price'>Price:</h4>
                    {this.props.data.data.category.products.map(product => (
                      <>
                        {this.url === product.id && product.prices.map(price =>
                          <>
                            <span key={Math.random() * 10} >{this.props.selectedCurrency === price.currency.symbol && `${this.props.selectedCurrency}${price.amount}`}</span>
                          </>
                        )}
                      </>
                    ))}
                  </div>
                  <div className="add-to-cart">
                    {!this.state.selectedProduct.inStock ?
                      <button className='btn primary-btn' disabled>Add To Cart</button>
                    :
                    <PrimaryBTN text='Add To Cart' handleAddToCart={this.props.click} productKeyNumber={this.state.productData.key} selectedCurrency={this.props.selectedCurrency} data={this.props.data} selectedProduct={this.state.selectedProduct} url={this.url} length={this.state.productData.activeYesNo.length} PrimaryBTNData={this.state.productData} />
                    }
                  </div>
                  {this.props.data.data.category.products.map(product => (
                    <>
                    {this.state.productData.id === product.id && 
                    <div className='product-description' dangerouslySetInnerHTML={{ __html: product.description }}></div>
                    }
                    </>
                  ))}
                </div>
              </>
              : null}

          </>
        }
      </div>
    );
  }
}

// }
