import React from 'react';
import ProductListItem from './ProductListItem';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  getProducts(props) {
    const init = {
      method: 'GET'
    };
    fetch('/api/products', init)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ products: data });
      })
      .catch(err => this.setState({ message: err.message }));
  }

  componentDidMount() {
    this.getProducts();
  }

  render() {
    const data = this.state.products;
    const dataMap = data.map(productObject => {
      return (
        <ProductListItem
          key={productObject.productId}
          products={productObject}
        />
      );
    });
    return (
      <div className={'container'}>
        <div className={'row'}>
          {dataMap}
        </div>
      </div>
    );
  }
}
