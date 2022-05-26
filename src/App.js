import { PureComponent } from "react";
import { 
  ApolloClient,
  ApolloProvider,
  InMemoryCache
} from "@apollo/client";
import { BrowserRouter as Router } from 'react-router-dom';

// components
import Navbar from './components/Navbar/Navbar';
import DynamicRoutes from './components/DynamicRoutes/DynamicRoutes';

// apollo client setup
const client = new ApolloClient({
  uri:'http://localhost:4000',
  cache: new InMemoryCache()
});

class App extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      curency: "",
      cart: {},
    }

    this.addToCart = this.addToCart.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onChekout = this.onChekout.bind(this);
  }

  curencyState(e) { this.setState({ curency: e }) }

  chekForItems(cart, id) { return Object.keys(cart).includes(id) }

  addToCart(item, selection) { this.setState({ cart: { ...this.state.cart,...{ [item.id]: { item,selection, count: 1 } } } }) }

  onAdd(e) {
    let { item, selection } = e;
    this.setState({ cart: { ...this.state.cart,...this.chekForItems(this.state.cart,item.id) ? { [ item.id ]: { item, selection, count: e.count +1 } } : { ...this.state.cart }} } )
  }

  onRemove(e) {
    let { item, selection } = e;
    this.setState({ cart: { ...this.state.cart,...this.chekForItems(this.state.cart,item.id) ? { [ item.id ]: { item, selection, count: e.count -1 } } : { ...this.state.cart }} } )
  }

  onChekout() {
    this.setState({ cart: {} })
  }
  
  componentDidUpdate(){
    let removeItemFromCart = Object.values(this.state.cart).filter( (i) => i.count === 0)
    if(removeItemFromCart.length > 0) {
      let curentState = this.state.cart
      delete curentState[removeItemFromCart[0].item.id]
      this.setState({ cart: { ...curentState }})
    }
  }

  render() {
    return (
    <ApolloProvider client={ client }>
      <Router>
        <div className="App">
          <Navbar cartFunction={ this.curencyState.bind(this) } curencyState={ this.state.curency } cartLength={ Object.keys(this.state.cart).length } cart={ this.state.cart } onAdd={ this.onAdd } onRemove={ this.onRemove } onChekout={ this.onChekout } />
          <div className="content">
            <DynamicRoutes curencyState={ this.state.curency } addToCart={ this.addToCart } cart={ this.state.cart } onAdd={ this.onAdd } onRemove={ this.onRemove } onChekout={ this.onChekout } />
          </div>
        </div>
      </Router>
    </ApolloProvider>
    );
  }
}

export default App;
