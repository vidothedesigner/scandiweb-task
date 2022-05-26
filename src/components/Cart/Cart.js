import { PureComponent } from 'react';
import { Link } from "react-router-dom";

// components
import Attributes from "../Attributes/Attributes";

class Cart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 0,
            total: 0
        }
    }

    fillState() {
        let quantity = 0;
        let total = 0;
        Object.entries(this.props.cart).forEach(item => {
            let prices = item[1].item.prices.filter( price => price.currency.label === this.props.curencyState )
            total = total+(item[1].count * prices[0].amount)
            quantity = quantity + item[1].count
        });

        total = Number(total.toFixed(2));
        this.setState({
            quantity,
            total
        });
    }

    displayCartItems() {
        let { cart, onAdd, onRemove } = this.props;
        if(Object.keys(cart).length === 0) {
            return ( <div><h1>Your bag is empty</h1></div> )
        } else {
            return Object.values(cart).map((single, index) => {
            let prices = single.item.prices.filter( price => price.currency.label === this.props.curencyState )
                return (<div key={ index } className="cartProduct">
                            <div className="cartProductSelection">
                                <h2 className="cartProductHeading">{ single.item.brand }</h2>
                                <h3 className="cartProductHeading">{ single.item.name }</h3>
                                <div className="priceTag">
                                    <span>{ prices[0].currency.symbol }</span>
                                    <span className='amount'>{ prices[0].amount }</span>
                                </div>
                                <Attributes productAttributes={ single.item.attributes }  preSelection={ Object.values(single.selection) } />
                            </div>
                            <div className="cartProductCount">
                                <button onClick={ () => { onAdd(single) } }>+</button>
                                <div className="count"><span>{ single.count }</span></div>
                                <button onClick={ () => { onRemove(single, single.count) } }>-</button>
                            </div>
                            <div className="cartProductImage">
                                <div className="imagePositionContainer">
                                    <img src={ single.item.gallery[0] } alt="" />
                                </div>
                            </div>
                        </div>
                );
            });
        }
    }

    paymentTotals() {
        return this.state.quantity !== 0 && (<div className="paymentTotals">
                { !this.props.isNav && <span>Tax 21%: <strong>{ Number((this.state.total * 21)/100).toFixed(2) }</strong> </span> } <br />
                { !this.props.isNav && <span>Quantity: <strong>{ this.state.quantity }</strong> </span> } <br />
                <span>Total: <strong>{ this.state.total }</strong> </span><br />
            </div>);
    }
    componentDidMount() {
        this.fillState();
    }

    componentDidUpdate() {
        this.fillState();
    }

    render() { 
        return ( 
            <div id="Cart">
                { this.props.isNav ? <h1 className="bagHeading">My Bag <span className="small">{ this.state.quantity } items</span></h1> : <h1 className="cartHeading">Cart</h1> }
                { this.displayCartItems() }
                { this.paymentTotals() }
                { this.state.quantity !== 0 && <div className="buttonContainer">
                    { this.props.isNav && <Link to="/cart" className='whiteButton'> View Cart</Link> }
                    <button className='greenButton' onClick={ this.props.onChekout }> { this.props.isNav ? 'Chekout' : 'Order'}</button>
                </div> }
            </div> 
        );
    }
}
 
export default Cart;