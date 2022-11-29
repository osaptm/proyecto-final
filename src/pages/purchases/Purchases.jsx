import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchasesThunk } from '../../store/slices/purchases.slice';
import {getDate} from '../../helpers/helpers';
import './styles/purchases.css'
import { Link, useNavigate } from 'react-router-dom';
import ProductPurchase from './ProductPurchase';
import { getProductsThunk } from "../../store/slices/products.slice";

const Purchases = () => {
    const dispatch = useDispatch();
    const purchases = useSelector((state) => state.purchases);
    const navigate = useNavigate();
    const products = useSelector(state=>state.products);
    
    
    useEffect(() => {
        dispatch(getPurchasesThunk());
        if(products.length===0) {dispatch(getProductsThunk());}
    }, []);

    return (
        <div className="purchases">
            <div className="purchases-title">
                <p onClick={()=>{navigate('/')}}>Home</p>
                <span></span>
                <p>My Purchases</p>
            </div>
            <div className="purchases__container">
                {purchases?.map((purchase) => {
                    return (
                        <article key={purchase.cartId} className="purchase-card">
                            <h3 className="purchase-card__title">{getDate(purchase.updatedAt)}</h3>
                            <div className="purchase-card__container">
                                {purchase.cart.products.map((product) => {
                                    let prodById = [];
                                    if(products.length !== 0){
                                        prodById = products.filter((productElement)=>{
                                            return productElement.id === product.id;
                                       })
                                    }
                                   return <ProductPurchase key={product.id} product={product} imgProd={prodById?.[0].productImgs?.[0]}/>
                                })}
                            </div>
                        </article>
                    );
                })}
            </div>
        </div>
    );
};

export default Purchases;