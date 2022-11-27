import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import './styles/styleSimilarProduct.css'

const SimilarProduct = ({product}) => {

    const [filterProducts, setFilterProducts] = useState()
    const allProducts = useSelector(state => state.products)
    const dispatch = useDispatch();
    const navigate = useNavigate ();
  
   useEffect(() => {
    if(allProducts.length !== 0){
      const filter = allProducts.filter(e => (e.category.id === product?.category.id&& product.id !== e.id))
      setFilterProducts(filter)
    }
  }, [product])


  return (
    <article className='similar-products'>
      <h2 className='similar-products__title'>Related Products</h2>
        <div className="container-card"> 
        {
              filterProducts?.map(ele => {           
                return (         
                            <article className="card-product" key={ele.id} >
                              <div onClick={()=>navigate(`/product/${ele.id}`)} className="container-figure">
                                <img
                                  src={ele.productImgs[1]}
                                  alt="img-products"
                                  className="img-front"
                                />
                                <img
                                  src={ele.productImgs[0]}
                                  alt="img-products"
                                  className="img-back"
                                />
                              </div>
        
                              <div onClick={()=>navigate(`/product/${ele.id}`)}>
                                <section className="info-container">
                                  <h3 className="product-name">{ele.title}</h3>                       
                                </section>
                              </div>                      
        
                              <div className="product-price">
                                  <p className="price-text">Price:</p>
                                  <p className="price">${ele.price}</p>
                              </div>
        
                              <button  className="card-product-btn">
                                <i className="fa-solid fa-cart-shopping"></i>
                              </button>
                              
                            </article>
                    )  
                })
          }    
        </div>
    </article>
  )
}

export default SimilarProduct