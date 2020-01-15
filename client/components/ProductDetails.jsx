import React from 'react'

export default class ProductDetails extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      product: null
    }
  }

  componentDidMount(){
    const init = {
      method: 'GET'
    };
    fetch(`/api/products/${productId}`, init)
      .then(res => res.json())
      .then(data => this.setState({product: data}))
  }

  render() {
    return (
      <div className={'container w-75 p-3 .bg-secondary'}>
        <div className={'backToCatalog'}>Back to Catalog</div>
        <span className={'productDetailImage'} src='./images/shamwow.jpg'></span>
        <div className={'productDetailsContainer'}>
          <h5 className={'productDetailsTitle'}>SHAMWOWZERS</h5>
            <h6 className={'productDetailPrice'}>$1000</h6>
            <p className={'productDetailShortDescription'}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores, officiis!
            </p>
        </div>
        <div className={'productDetailsLongDescription'}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, sapiente iusto corporis dolorem sit reiciendis deserunt? Qui veritatis maxime consequatur!
        </div>
      </div>
    )
  }
}
