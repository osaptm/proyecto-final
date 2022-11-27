import React, { useEffect , useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SliderImgs from './SliderImgs'
import ProductInfoId from './ProductInfoId'
import SimilarProduct from './SimilarProduct'
import { getProductsThunk } from '../../store/slices/products.slice';
import { useDispatch, useSelector } from 'react-redux';
import './styles/styleProductId.css'

const ProductId = () => {  
    const {id} = useParams() 
    const navigate = useNavigate()   
    const dispatch = useDispatch();
    const products = useSelector(state=>state.products)
    const product =  products.find(prod => prod.id === Number(id)) 

    useEffect(() => {  
      dispatch(getProductsThunk());
    }, [id]);

  return (
    <section className='product'>
      <div className='navigate-container'>
        <p onClick={()=>navigate('/')}>Home</p>
        <p>{'->'}</p>
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