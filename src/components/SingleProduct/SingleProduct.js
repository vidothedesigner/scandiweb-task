import { PureComponent } from "react";
import { graphql } from '@apollo/react-hoc';
import { Navigate } from "react-router-dom";

// components
import Attributes from "../Attributes/Attributes";

// query
import { singleProduct } from "../../queries/queries";

class SingleProduct extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            selection: {}
        }
    }
    displayProduct() {
        let data = this.props.data;
        if(data.loading){
            return( <div>Loading product...</div>);
        } else {
            let product = data.product
            if(product){
                let prices = product.prices.filter( price => price.currency.label === this.props.curencyState )
                return (
                    <div className="singleProductContainer">
                        <div className="thumbnails">
                            {product.gallery.map((image, i) => {
                                return <img key={ i } src={ image } alt={ product.name } />
                            })}
                        </div>
                        <div className="largeImage">
                            <img src={ product.gallery[0] } alt={ product.name } />   
                        </div>
                        <div className="productDiscription">
                            <h1>{ product.brand }</h1>
                            <h2>{ product.name }</h2>
                            <Attributes productAttributes={ product.attributes } />
                            <div className="priceTag">
                                <span>{ prices[0].currency.symbol }</span>
                                <span>{ prices[0].amount }</span>
                            </div>
                            { product.description ? <div dangerouslySetInnerHTML={{ __html: product.description }}></div> : "" }
                            <div className="buttonContainer">
                                <button className="addToCartButton" onClick={ () => this.props.addToCart(product) }>Add to Cart</button>
                            </div>
                        </div>

                    </div>
                )
            }
            return <Navigate replace to="/all"></Navigate>
        }
    }//displayProduct

    render() { 
        return ( 
            <div className="singleProductContainer">
                {this.displayProduct()}
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