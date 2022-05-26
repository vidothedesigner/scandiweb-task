import { PureComponent } from "react";
import { graphql } from '@apollo/react-hoc';

// queries
import { curencies } from "../../queries/queries";

class Currencies extends PureComponent {
    displayCurrencies() {
        let data = this.props.data;
        if(data.loading) {
            return ( <option value="loading">Loading...</option> );
        } else {
            return data.currencies.map((curency,i)=>{
                return <option key={ i } value={ curency.label }>{ curency.symbol } { curency.label }</option>
            });
        }
    }
    componentDidUpdate(prevProps) {
        if(!this.props.data.loadng && prevProps.curencyState === "") {
            this.props.cartFunction(this.props.data.currencies[0].label);
        }
    }

    render() { 
        return ( 
            <select name="currencies" id="currencies" onChange={ (e)=>{ this.props.cartFunction(e.target.value) } }>
                { this.displayCurrencies() }
            </select>
         );
    }
}
 
export default graphql(curencies)(Currencies);