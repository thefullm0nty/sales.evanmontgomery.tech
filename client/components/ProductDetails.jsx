import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount(productId) {
    // console.log("props in app fetch: ", props)
    const init = {
      method: 'GET'
    };
    fetch(`/api/products/${productId}`, init)
      .then(res => res.json())
      .then(data => this.setState({ product: data }));
  }

  render() {
    return (
      <div className={'container w-75 p-3 bg-secondary'}>
        <div className={'backToCatalog row bg-primary'} onClick={() => this.props.setView('catalog', {})}>Back to Catalog</div>
        <div className={'row'}>
          <div className={'col bg-success'}>
            <img className={'productDetailImage'} src='./images/shamwow.jpg' style={{ height: '200px', width: '200px' }}></img>
          </div>
          <div className={'col bg-danger'}>
            <h5 className={'productDetailsTitle'}>SHAMWOWZERS</h5>
            <h6 className={'productDetailPrice'}>$1000</h6>
            <p className={'productDetailShortDescription'}>
              It's like a chamois, towel, and sponge, all in one! Soaks up to 10x it's weight in any liquid!
          </p>
          </div>
        </div>
        <div className={'row bg-warning'}>
          <div className={'productDetailsLongDescription'}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, sapiente iusto corporis dolorem sit reiciendis deserunt? Qui veritatis maxime consequatur!
        </div>
        </div>
      </div>



      // <div className={'container w-75 p-3 bg-secondary'}>
      //   <div className={'backToCatalog'} onClick={() => this.props.setView('catalog', {})}>Back to Catalog</div>
        // <img className={'productDetailImage'} src='./images/shamwow.jpg' style={{ height: '200px', width: '200px' }}></img>
      //   <div className={'productDetailsContainer bg-danger'}>
          // <h5 className={'productDetailsTitle'}>SHAMWOWZERS</h5>
          // <h6 className={'productDetailPrice'}>$1000</h6>
          // <p className={'productDetailShortDescription'}>
          //     It's like a chamois, towel, and sponge, all in one! Soaks up to 10x it's weight in any liquid!
          // </p>
      //   </div>
        // <div className={'productDetailsLongDescription'}>
        //   Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, sapiente iusto corporis dolorem sit reiciendis deserunt? Qui veritatis maxime consequatur!
        // </div>
      // </div>
    );
  }
}
