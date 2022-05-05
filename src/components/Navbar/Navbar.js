import { PureComponent } from "react";
import { Link } from "react-router-dom";
import { graphql } from '@apollo/react-hoc';

// components
import Currencies from "../Currencies/Currencies";


// query
import { getCategoriesQuery } from "../../queries/queries";

class Navbar extends PureComponent {
    displayCategories() {
        let data = this.props.data;
        if(data.loading){
            return( <div>Loading menu...</div>);
        } else {
            return data.categories.map(category => {
                return (
                    <li key={category.name}><Link to={'/'+category.name}>{ category.name }</Link></li>
                )
            })
        }
    }
    render() { 
        return ( 
            <div className="header">
                <div className="left-div">
                    <ul>
                        {this.displayCategories()}
                    </ul>
                </div>
                <div className="midd-div">
                    {/* i sholud do dynamic route here */}
                    <Link to="/all" >LOGO</Link>    
                </div>
                <div className="right-div">
                    <ul>
                        <li><Currencies cartFunction={this.props.cartFunction} curencyState={this.props.curencyState} /></li>
                        <li>cart</li>
                    </ul>
                </div>
            </div>
         );
    }
}
 
export default graphql(getCategoriesQuery)(Navbar);