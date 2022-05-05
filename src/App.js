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
      cart: {}
    }
  }

  curencyState(e) {
    // console.log(e)
    this.setState(() => ({
        curency: e
    }));
  }

  addToCart(item) {
    console.log(item,'from APP.js')
  }
  // componentDidUpdate(){
  //   console.log(this.state, 'didUpdate')
  // }

  render() {
    return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Navbar cartFunction={this.curencyState.bind(this)} curencyState={this.state.curency} />
          <div className="content">
            <DynamicRoutes curencyState={this.state.curency} addToCart={this.addToCart}/>
          </div>

        </div>
      </Router>
    </ApolloProvider>
    );
  }
}

export default App;
