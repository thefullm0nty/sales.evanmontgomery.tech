import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    const init = {
      method: 'GET'
    };
    fetch(`/api/products/${this.props.productId}`, init)
      .then(res => res.json())
      .then(data => this.setState({ product: data }));
  }

  render() {
    if (this.state.product === null) {
      return null;
    } else {
      const singleProductDetail = this.state.product;
      const priceInt = '$' + parseInt((singleProductDetail.price) / 100).toFixed(2);
      return (
        <div className={'container w-75 p-3 bg-secondary'}>
          <div className={'backToCatalog row'} onClick={() => this.props.setView('catalog', {})}>Back to Catalog</div>
          <div className={'row'}>
            <div className={'col'}>
              <img className={'productDetailImage'} src={singleProductDetail.image} style={{ height: '250px', width: '250px' }}></img>
            </div>
            <div className={'col'}>
              <h5 className={'productDetailsTitle'}>{singleProductDetail.name}</h5>
              <h6 className={'productDetailPrice'}>{priceInt}</h6>
              <p className={'productDetailShortDescription'}>
                {singleProductDetail.shortDescription}
              </p>
            </div>
          </div>
          <div className="mt-5" />
          <div className={'row'}>
            <div className={'productDetailsLongDescription'}>
              {singleProductDetail.longDescription}
            </div>
          </div>
        </div>
      );
    }
  }
}
