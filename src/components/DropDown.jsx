import React from 'react'
import '../styles/dropDown.css'
import arrowUp from '../images/arrow-up.svg'
import arrowDown from '../images/arrow-down.svg'

export default class DropDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
        this.refOne = React.createRef();
    }

    toggle = () => {
        this.setState({ open: !this.state.open });
    }

    componentDidUpdate() {
        this.handleSelected = (symbol) => {
            this.props.setSelectedCurrency(symbol);
            this.setState({ open: !this.state.open });
            const selected = JSON.parse(localStorage.getItem('selected'));
            if (selected) {
                localStorage.removeItem('selected');
                localStorage.removeItem('cartNumber');
            }
            window.location.reload();
        }
    }


    componentDidMount() {
        document.addEventListener("click", this.handleClickOutside, true);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleClickOutside, true);
    }

    handleClickOutside = (e) => {
        if (!this.refOne.current.contains(e.target)) {
            this.setState({
                open: false
            })
        }
    }

    render() {
        const { item } = this.props;
        const { open } = this.state;
        return (
            <div className='dd-wrapper'  ref={this.refOne}>
                <div className='dd-header' role='button' onClick={() => this.toggle(!open)} tabIndex={0} >
                    <div className='dd-header-title'>
                        <p className='dd-header-title-bold'>{this.props.selectedCurrency}</p>
                    </div>
                    <div className='dd-header-action'>
                        <p>{open ? <img src={arrowUp} alt="" /> : <img src={arrowDown} alt="" />}</p>
                    </div>
                </div>
                {open && (
                    <ul className='dd-list'>
                        {item.map(item => (
                            <li className='dd-list-item' key={item.symbol}>
                                <button type='button' className='dd-list-item-button' onClick={() => this.handleSelected(item.symbol)}>
                                    <span>{item.symbol} {item.label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        )
    }
}
