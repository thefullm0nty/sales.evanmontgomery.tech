import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount(productId) {
    const init = {
      method: 'GET'
    };
    fetch(`/api/products/${productId}`, init)
      .then(res => res.json())
      .then(data => this.setState({ product: data }));
  }

  render() {
    // console.log("product in details: ", product)
    return (
      <div className={'container w-75 p-3 bg-secondary'}>
        <div className={'backToCatalog'}>Back to Catalog</div>
        <img className={'productDetailImage'} src='./images/shamwow.jpg' style={{height: '200px', width: '200px'}}></img>
        <div className={'productDetailsContainer'}>
          <h5 className={'productDetailsTitle'}>SHAMWOWZERS</h5>
          <h6 className={'productDetailPrice'}>$1000</h6>
          <p className={'productDetailShortDescription'}>
              It's like a chamois, towel, and sponge, all in one! Soaks up to 10x it's weight in any liquid!
          </p>
        </div>
        <div className={'productDetailsLongDescription'}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, sapiente iusto corporis dolorem sit reiciendis deserunt? Qui veritatis maxime consequatur!
        </div>
      </div>
    );
  }
}
