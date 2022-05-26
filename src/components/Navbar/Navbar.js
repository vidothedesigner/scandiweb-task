import { PureComponent } from "react";
import { Link } from "react-router-dom";
import { graphql } from '@apollo/react-hoc';
import Logo from './VSFlogo.svg';
import CartImage from './Cart.svg'

// components
import Currencies from "../Currencies/Currencies";
import Cart from "../Cart/Cart";

// query
import { getCategoriesQuery } from "../../queries/queries";

class Navbar extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            hovering: false
        }
    }

    displayCategories() {
        let data = this.props.data;
        if(data.loading){
            return( <div>Loading menu...</div> );
        } else {
            return data.categories.map(category => {
                return (
                    <li key={ category.name }><Link to={ '/'+category.name }>{ category.name }</Link></li>
                )
            })
        }
    }

    render() { 
        const { cartFunction, curencyState, cartLength, cart, onAdd, onRemove } = this.props;
        return ( 
            <div className="header">
                <div className="leftDiv">
                    <ul>
                        { this.displayCategories() }
                    </ul>
                </div>
                <div className="midDiv">
                    <Link to="/all" ><img src={ Logo } alt="" /></Link>    
                </div>
                <div className="rightDiv">
                    <ul>
                        <li><Currencies cartFunction={ cartFunction } curencyState={ curencyState } /></li>
                        <li className="navCartLi" onMouseEnter={ () => this.setState({ hovering: true}) } onMouseLeave={ () => this.setState({ hovering: false }) } >
                            <Link to="/cart"><img src={ CartImage } alt="" />{ cartLength ? <span>{ cartLength }</span> : '' }</Link>
                            { this.state.hovering && <div className="navCart"><Cart isNav={ true } cart={ cart } onAdd={ onAdd } onRemove={ onRemove } curencyState={ curencyState } onChekout={ this.props.onChekout } /></div> }
                        </li>
                    </ul>
                </div>
            </div>
         );
    }
}
 
export default graphql(getCategoriesQuery)(Navbar);