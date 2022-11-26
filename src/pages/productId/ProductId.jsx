import axios from 'axios'
import React, { useEffect } from 'react'
import './styles/styleProductId.css'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SliderImgs from './SliderImgs'
import ProductInfoId from './ProductInfoId'
import SimilarProduct from './SimilarProduct'
import { getProductsThunk } from '../../store/slices/products.slice';
import { useDispatch, useSelector } from 'react-redux';
const ProductId = () => {

    const [product, setProduct] = useState()
    
    const navigate = useNavigate()

    const {id} = useParams()
    
    const dispatch = useDispatch();

    const products = useSelector(state=>state.products)

    
    useEffect(() => {       
       dispatch(getProductsThunk());
       const prod = products.find(prod => prod.id === Number(id)) 
       setProduct(prod);
    }, [id]);

    const handleVolver = () => {
      navigate('/')
    }


  return (
    <section className='product'>
      <div className='navigate-container'>
        <p onClick={handleVolver}>Home</p>
        <span></span>
        <p>{product?.title}</p>
      </div>
      
      <div className='product-slider-info'>
        <SliderImgs product={product}/>
        <ProductInfoId product={product}/>
      </div>

        <SimilarProduct product={product}/>
    </section>
  )
}

export default ProductId