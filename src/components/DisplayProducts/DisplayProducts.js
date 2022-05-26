import { PureComponent } from "react";
import { graphql } from '@apollo/react-hoc';

//components
import ProductCard from "../ProductCard/ProductCard";

// query
import { getAll } from "../../queries/queries";

class DisplayProducts extends PureComponent {
    manageProducts() {
        let data = this.props.data;
        if(data.loading){
            return( <div>Loading products...</div> );
        } else {
            return data.categories.map((cat, i) => {
                if(this.props.catName !== cat.name){
                    return null;
                } else {
                    return cat.products.map(product => {
                        return <ProductCard key={ product.id } product={ product } curencyState={ this.props.curencyState } />
                    });
                }
            });
        }
    }
    render() {
        return (
            <div className="displaProducts">
                <h1 className="categoryTitle">Category { this.props.catName }</h1>
                <div className="productsContainer">
                    { this.manageProducts() }
                </div>
            </div>
         );
    }
}

export default graphql(getAll)(DisplayProducts);