import React from 'react';
import Header from './header';
import ProductList from './Product-List';
import ProductDetails from './ProductDetails';

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  setView(name, params){
    this.setState({view: {
      name: name,
      params: params
    }
    })
  }

  render() {
      if (this.state.view.name === 'catalog'){
        return (
          <div>
            <Header text=' Wicked Sales' />
            <ProductList setView={this.setView} />
          </div>
        )
      } else {
        return (
          <div>
            <Header text=' Wicked Sales' />,
            <ProductDetails />
          </div>
        )
      }
  }
}
