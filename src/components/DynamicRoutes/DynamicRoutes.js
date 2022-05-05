import { PureComponent } from "react";
import { graphql } from '@apollo/react-hoc';
import { Routes, Route } from 'react-router-dom';

// components
import DisplayProducts from '../DisplayProducts/DisplayProducts';
import SingleProduct from '../SingleProduct/SingleProduct';

// query
import { getCategoriesQuery } from "../../queries/queries";

class DynamicRoutes extends PureComponent {
    displayRoutes() {
        let data = this.props.data.categories;
        if(data) {
            return data.map(category => {
                return <Route key={category.name} path={'/'+category.name} element={<DisplayProducts catName={category.name} curencyState={this.props.curencyState} />} ></Route>
            });
        }
    }
    render() { 
        return ( 
            <Routes>
                {this.displayRoutes()}
                <Route path="*" element={<SingleProduct curencyState={this.props.curencyState}  addToCart={this.props.addToCart}/>} ></Route>
            </Routes>
         );
    }
}

export default graphql(getCategoriesQuery)(DynamicRoutes);