import React from 'react';

function ProductListItem(props) {
  const GrabbedProducts = props.products;
  const priceInt = '$' + parseInt((GrabbedProducts.price) / 100).toFixed(2);
  return (
    <div className={'col-sm'}>
      <div className="card" style={{ width: '18rem' }}>
        <img src={GrabbedProducts.image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{GrabbedProducts.name}</h5>
          <h6 className="card-text">{priceInt}</h6>
          <p className="card-text">{GrabbedProducts.shortDescription}</p>
        </div>
      </div>
      <div className="mt-5" />
    </div>
  );
}

export default ProductListItem;
