import { PureComponent } from "react";
import { Link } from "react-router-dom";

class ProductCard extends PureComponent {
    render() { 
        let product = this.props.product;
        let prices = product.prices.filter( price => price.currency.label === this.props.curencyState )
        return ( 
            <div key={ product.id } className="productCard">
                <Link to={ product.id }>
                    <div className="imgContainer">
                        <img src={ product.gallery[0] } alt="" />
                    </div>
                    <h2 className="productName">{ product.name }</h2>
                    <div className="priceTag">
                        <span>{ prices[0].currency.symbol }</span>
                        <span>{ prices[0].amount }</span>
                    </div>
                </Link>
            </div>
         );
    }
}

export default ProductCard;