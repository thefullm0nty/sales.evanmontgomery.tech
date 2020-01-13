import React from './react'
import ProductListItem from './ProductListItem'
//renders grid of items

export default class ProductList extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      prouducts: []
    }
  }

  getProducts(){

  }

  componentDidMount(){
    this.getProducts()
  }

  render(){
    return (
      <div className={'container'}>
        <div className={'row'}>
          <div className={'col-sm'}>
            <ProductListItem />
          </div>
          <div className={'col-sm'}>
            <ProductListItem />
          </div>
          <div className={'col-sm'}>
            <ProductListItem />
          </div>
        </div>
      </div>
    )
  }
}
