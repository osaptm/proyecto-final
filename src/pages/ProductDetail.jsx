import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';

const ProductDetail = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const products = useSelector(state=>state.products)
    const prod = products.find(prod=>{
        return prod.id === Number(id)
    })

    const relatedProd = products.filter(ele=>{
        return (ele.category.id === prod.category.id && ele.id !== prod.id)
    });

    useEffect(() => {       
       dispatch(getProductsThunk());
    }, []);

    return (   
        <>
            <div className="cardProductDetail">
                <h5>{prod?.title}</h5>
                <img className="imgProductDetail" src={prod?.productImgs[0]} alt="" />
                <p>{prod?.description}</p>
            </div>
            <div className='relatedProducts'>
                {
                    relatedProd.map(prodRelated=>{
                        return (
                                <Link key={prodRelated.id} to={'/product/'+prodRelated.id}>
                                    <div className="cardProduct">
                                        <h5>{prodRelated.title}</h5>
                                        <img className="imgProduct" src={prodRelated.productImgs[0]} alt="" />
                                    </div>
                                </Link>
                        )  
                    })
                }
            </div>
        </>
    );
};

export default ProductDetail;