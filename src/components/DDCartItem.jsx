/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import '../styles/ddCartItem.css'
import arrow from '../images/white-arrow.svg'

export default class DDCartItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageNumber: 0,
            selectedProduct: "",
            selectedImage: "",
            productAttributes: [],
            yesNoAttributes: [],
            productData: {
                id: this.props.id,
                activeSize: '40',
                activeCapacity: '1T',
                activeSwatch: 'White',
                activeYesNo: [
                ]
            },
        }
    }


    componentDidUpdate(prevProps, prevState) {
        let currentImage = this.props.cartItem[0].gallery[0]

        if (this.state.imageNumber !== prevState.imageNumber) {
            currentImage = this.props.cartItem[0].gallery[this.state.imageNumber]
            return currentImage
        }

        if (this.props.data.handleData.loading === false && this.state.selectedProduct === "") {
            this.setState({
              selectedProduct: this.props.data.handleData.data.category.products.find(item => item.id === this.state.productData.id),
              productAttributes: this.props.data.handleData.data.category.products.map(product => product).find(item => item.id === this.state.productData.id).attributes,
              yesNoAttributes: this.props.data.handleData.data.category.products.map(product => product).find(item => item.id === this.state.productData.id).attributes.filter(att => att.name.includes(' ') === true),
              productData: {
                ...this.state.productData,
                // activeYesNo should be an array of objects with name and id and 'yes' is the default id
                activeYesNo: this.props.data.handleData.data.category.products.map(product => product).find(item => item.id === this.state.productData.id).attributes.filter(att => att.name.includes(' ') === true).map(att => ({ name: att.name, id: 'Yes' }))
      
              }
            })
          }

        if (this.props.productKeyNumber !== localStorage.getItem(`${this.props.productKeyNumber}` && this.props.productKeyNumber === prevState)) {
            localStorage.setItem(`${this.props.productKeyNumber}`, JSON.stringify(this.state.productData))
        }

    }

    componentDidMount() {
        const data = JSON.parse(localStorage.getItem(`${this.props.productKeyNumber}`));
        if (data) {
            this.setState({
                productData: data
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

    get currentImage() {
        return this.props.cartItem[0].gallery[this.state.imageNumber]
    }

    cartItemDecrement = (cardId) => {
        this.props.data.setCartNumber(this.props.data.cartNumber - 1);
        this.props.data.setSelected(cart =>
            cart.map((item) => {
                if (item[4] === cardId) {
                    item[3].qty--
                }
                return item;
            })
        )
        if (this.props.cartItem[3].qty === 1) {
            this.props.handleRemove(this.props.productKeyNumber);
        }
    }

    cartItemIncrement = (cardId) => {
        this.props.data.setCartNumber(this.props.data.cartNumber + 1);
        this.props.data.setSelected(cart =>
            cart.map((item) => {
                if (item[4] === cardId) {
                    item[3].qty++
                }
                return item;
            })
        )
    }

    nextImage() {
        this.setState(prevState => ({
            imageNumber: prevState.imageNumber + 1,
        }))
        if (this.state.imageNumber === this.props.cartItem[0].gallery.length - 1) {
            this.setState({
                imageNumber: 0
            })
        }
    }

    prevImage() {
        this.setState(prevState => ({
            imageNumber: prevState.imageNumber - 1,
        }))
        if (this.state.imageNumber === 0) {
            this.setState({
                imageNumber: this.props.cartItem[0].gallery.length - 1
            })
        }
    }

    render() {
        // this.props.data.data.category.products.map(product => product).find(item => item.id === this.url).attributes.filter(att => att.name.includes(' ') === true).map(att => ({ name: att.name, id: 'Yes' }))
        // console.log(this.props.data.handleData.data.category.products.map(product => product).find(item => item.id === this.state.productData.id).attributes.filter(att => att.name.includes(' ') === true).map(att => ({ name: att.name, id: 'Yes' })))
        // console.log(this.props.productKeyNumber);
        return (
            <>
                {this.props.data.cartNumber >= 1 ?

                    <div className='cart-item-container'>
                        <div className="data">
                            {this.props.productName === true ? <>
                                <h2 className='first-name'>{this.props.title.split(' ')[0]}</h2>
                                <h2 className='remaining-name'>{this.props.title.indexOf(this.props.title.split(' ')[1]) !== -1 ? this.props.title.slice(this.props.title.indexOf(this.props.title.split(' ')[1])) : null}</h2>
                            </>
                                : <h3 className='title'>{this.props.title}</h3>}
                            <p className='price'>{this.props.data.selectedCurrency}{this.props.cartItem[2].amount}</p>
                            <div className="attributes-container">
                                {this.props.cartItem[0].attributes.map(attribute =>
                                    <>
                                        <p>{attribute.name}:</p>
                                        <div className='text-container'>
                                            {attribute.name === "Size" && attribute !== null ?
                                                <>
                                                    {attribute.items.map(attrItem => <button key={attrItem.id + Math.random()} type='button' className={`data-btn attributes-size ${this.state.productData.activeSize === attrItem.id ? 'active-size' : ''}`} onClick={() => this.handleSize(attrItem.id)} >{attrItem.displayValue}</button>)}
                                                </>
                                                :

                                                attribute.name.length > 10 ?
                                                    <>
                                                        {attribute.items.map(attrItem => <button key={attrItem.id + Math.random()} type='button' className={`data-btn attributes-yesNo ${this.state.productData.activeYesNo.some(item => item.id === attrItem.id && item.name === attribute.name) ? 'active-yesNo' : ''}`} onClick={() => this.productYesNo(attribute.name, attrItem.id)} >{attrItem.displayValue}</button>)} </>
                                                    : attribute.name === "Capacity" ?
                                                        <>
                                                            {attribute.items.map(attrItem =>
                                                                <button key={attrItem.id + Math.random()} type='button' className={`data-btn attributes-capacity ${this.state.productData.activeCapacity === attrItem.id ? 'active-capacity' : ''}`} onClick={() => this.handleCapacity(attrItem.id)} >{attrItem.displayValue}</button>)}
                                                        </>
                                                        : null}
                                        </div> </>)}
                                <div className="color-container">
                                    {this.props.cartItem[0].attributes.map(attribute =>
                                        <>
                                            {attribute.name === "Color" ?
                                                <>
                                                    <div className="color-buttons">
                                                        {attribute.items.map(attrItem =>
                                                            <button key={attrItem.id + Math.random()} type='button' className={`data-btn attributes-swatch ${this.state.productData.activeSwatch === attrItem.id ? 'active-swatch' : ''}`} onClick={() => this.handleSwatch(attrItem.id)} style={{ backgroundColor: `${attrItem.value}` }} ></button>)}
                                                    </div>
                                                </>
                                                : null}
                                        </>)}
                                </div>
                            </div>
                        </div>
                        <div className="count">
                            <div className="count-data">
                                <button type='button' onClick={() => this.cartItemIncrement(this.props.productKeyNumber)} className="data-btn">+</button>
                                <span>{this.props.cartItem[3].qty}</span>
                                <button type='button' onClick={() => this.cartItemDecrement(this.props.productKeyNumber)} className="data-btn">-</button>
                            </div>
                        </div>
                        <div className="image">
                            {this.props.controllers !== true ?
                                <img src={this.props.img} alt="product image" />
                                :
                                <div className='gallery-container'>
                                    <img src={this.currentImage} alt="product image" />
                                    <div className="gallery-buttons">
                                        <button type="button" className='next-image' onClick={() => this.nextImage()} ><img src={arrow} alt="Next Image" /></button>
                                        <button type="button" className='prev-image' onClick={() => this.prevImage()} ><img src={arrow} alt="Previous Image" /></button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    : null}
            </>)
    }
}