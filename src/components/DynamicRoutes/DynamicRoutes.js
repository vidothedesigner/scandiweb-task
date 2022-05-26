import { PureComponent } from "react";
import { graphql } from '@apollo/react-hoc';
import { Routes, Route } from 'react-router-dom';

// components
import DisplayProducts from '../DisplayProducts/DisplayProducts';
import SingleProduct from '../SingleProduct/SingleProduct';
import Cart from "../Cart/Cart";

// query
import { getCategoriesQuery } from "../../queries/queries";

class DynamicRoutes extends PureComponent {
    displayRoutes() {
        let data = this.props.data.categories;
        if(data) {
            return data.map(category => {
                return <Route key={ category.name } path={ '/'+category.name } element={ <DisplayProducts catName={ category.name } curencyState={ this.props.curencyState } /> } ></Route>
            });
        }
    }
    render() { 
        const { cart, curencyState, addToCart, onAdd, onRemove } = this.props;
        return ( 
            <Routes>
                { this.displayRoutes() }
                <Route path="/cart" element={ <Cart cart={ cart } onAdd={ onAdd } onRemove={ onRemove } curencyState={ curencyState } onChekout={ this.props.onChekout } /> }></Route>
                <Route path="*" element={ <SingleProduct curencyState={ curencyState } addToCart={ addToCart } /> } ></Route>
            </Routes>
         );
    }
}

export default graphql(getCategoriesQuery)(DynamicRoutes);