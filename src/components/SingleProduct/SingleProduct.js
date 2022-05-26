import { PureComponent } from "react";
import { graphql } from '@apollo/react-hoc';
import { Navigate } from "react-router-dom";

// components
import Gallery from "../Gallery/Gallery";
import Attributes from "../Attributes/Attributes";

// query
import { singleProduct } from "../../queries/queries";

class SingleProduct extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.getSelectedItems = this.getSelectedItems.bind(this)

    }
    getSelectedItems(type,selection) {
        // console.log(type, selection)
        // console.log(this.state)
        this.setState({...this.state, [type]: selection });
    }
    displayProduct() {
        let data = this.props.data;
        if(data.loading){
            return( <div>Loading product...</div> );
        } else {
            let product = data.product
            if(product){
                let prices = product.prices.filter( price => price.currency.label === this.props.curencyState )
                // console.log(this.props, 'is this')
                return (
                    <>
                        <Gallery productGallery={ product.gallery } />
                        <div className="productDiscription">
                            <h1>{ product.brand }</h1>
                            <h2>{ product.name }</h2>
                            <Attributes productAttributes={ product.attributes } getSelectedItems={ this.getSelectedItems } />
                            <div className="priceTag">
                                <h3>Price:</h3>
                                <span>{ prices[0].currency.symbol }</span>
                                <span>{ prices[0].amount }</span>
                            </div>
                            <div className="buttonContainer">
                                <button className="addToCartButton" onClick={ () => this.props.addToCart(product, this.state) }>Add to Cart</button>
                            </div>
                            { product.description ? <div className="description" dangerouslySetInnerHTML={ { __html: product.description } }></div> : "" }
                        </div>

                    </>
                )
            }
            return <Navigate replace to="/all"></Navigate>
        }
    }//displayProduct

    render() { 
        return ( 
            <div className="singleProductContainer">
                { this.displayProduct() }
            </div>
         );
    }
}
 
export default graphql(singleProduct, {
    options:() => {
        return {
            variables: {
                id: `${window.location.pathname.match(/(\w*([a-zA-Z0-9]-)\w*){1,10}$/gi)}`
            }
        }
    }
})(SingleProduct);