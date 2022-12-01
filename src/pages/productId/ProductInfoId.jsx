import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import getConfig from '../../helpers/getConfig'
import { getCartThunk } from '../../store/slices/cart.slice'
import './styles/styleProductInfo.css'

const ProductInfoId = ({product}) => {
    const [counter, setCounter] = useState(1)
    const dispatch = useDispatch()
  
    const addToCart = () => {
      const URL = 'https://e-commerce-api.academlo.tech/api/v1/cart'  
      const addproduct = {
        id: product.id,
        quantity: counter
      }
      axios.post(URL, addproduct, getConfig())
        .then(res => {
          dispatch(getCartThunk())
        })
        .catch(err => console.log(err))
    }
  

  return (
    <article className='product-info'>

      <h2 className='product-info__title'>{product?.title}</h2>
      <p className='product-info__description'>{product?.description}</p>

    <section className='container-info'>
      
      <div className='card-product__price-container'>
        <h3 className='card-product__price-label product-info__label'>Price</h3>
        <p className='card-product__price-number product-info__number'>$ {product?.price}</p>
      </div>

      <div className='product-info__quantity-container'>
        <div onClick={()=>{counter<2||setCounter(counter - 1)}}  className='product-info__minus'><i className="fa-solid fa-minus"></i></div>
        <div className='product-info__counter'>{counter}</div>
        <div onClick={()=>{setCounter(counter + 1)}} className='product-info__plus'><i className="fa-solid fa-plus"></i></div>
      </div>

      <button onClick={()=>{addToCart()}}
        className='product-info__btn'>
        Agragar al carrito <i className="fa-solid fa-cart-plus"></i>
      </button>


      </section>
    </article>
  )
}

export default ProductInfoId