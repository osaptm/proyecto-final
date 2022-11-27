import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate  } from "react-router-dom";
import { filterProductsThunk, filterSearchThunk, getProductsThunk } from "../../store/slices/products.slice";
import { Button, Form, InputGroup } from "react-bootstrap";
import './css/cssHome.css';
const Home = () => {
  const [categorys, setcategorys] = useState([]);
  const [inputSearch, setInputSearch] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate ();
  const products = useSelector(state=>state.products);

  const getCategorys = () =>{
    axios
    .get("https://e-commerce-api.academlo.tech/api/v1/products/categories")
    .then((res) =>  {
      setcategorys(res.data.data.categories)
    })
  }

  const addCartProduct = () => alert("Pendiente")
  useEffect(() => {
    dispatch(getProductsThunk());
    getCategorys();
  }, []);

  return (
    <>
    <InputGroup className="mb-3">
        <Form.Control
          placeholder="Recipient's Name Product"
          aria-label="Recipient's Name Product"
          aria-describedby="basic-addon2"
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
        />
        <Button
          variant="outline-secondary"
          onClick={() => dispatch(filterSearchThunk(inputSearch))}
        >
          Search
        </Button>
      </InputGroup>

    <div className="container-products">
      
      <div className="aside-Container">
          <div className="contentCategorys">     
            <b>- Categoria -</b>
            <ul className="container-list-category">
              <li className="category-item" onClick={()=>{dispatch(getProductsThunk()); setInputSearch("");}}>ALL</li>  
              {categorys.map((category) => (
                <li
                  className="category-item"
                  onClick={() =>{dispatch(filterProductsThunk(category.id)); setInputSearch("");}}
                  key={category.id}
                >
                  {category.name}
                </li>
              ))}
            </ul>

          </div>
      </div> 


      <div className="container-card">    
        {
          products.map(product=>{
            return (
                    <article className="card-product" key={product.id} >
                      <div onClick={()=>navigate(`/product/${product.id}`)} className="container-figure">
                        <img
                          src={product.productImgs[1]}
                          alt="img-products"
                          className="img-front"
                        />
                        <img
                          src={product.productImgs[0]}
                          alt="img-products"
                          className="img-back"
                        />
                      </div>

                      <div onClick={()=>navigate(`/product/${product.id}`)} >
                        <section className="info-container">
                          <h3 className="product-name">{product.title}</h3>                       
                        </section>
                      </div>                      

                      <div className="product-price">
                          <p className="price-text">Price:</p>
                          <p className="price">${product.price}</p>
                      </div>

                      <button onClick={addCartProduct} className="card-product-btn">
                        <i className="fa-solid fa-cart-shopping"></i>
                      </button>
                      
                    </article>
            )  
          })
        }
      </div>
    </div>
    </>
  );
};

export default Home;
