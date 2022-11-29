import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductPurchase = ({product, imgProd}) => {
        return (
            <div className='product-purchase'>
                <Link to={`/product/${product.id}`} className='imgPurchase'>
                    <img src={imgProd} alt="" className='img-fluid'/>
                    <h4 className='product-purchase__title'>{product.title}</h4>
                </Link>
                <p className='product-purchase__quantity'>
                    <span>
                        {product.productsInCart.quantity}
                    </span>
                </p>
                <p className='product-purchase__price'>$ {product.price}</p>
            </div>
        )
};
export default ProductPurchase;