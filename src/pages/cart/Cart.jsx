import { useEffect } from "react";
import { Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartPurchaseThunk, deletePorductCartThunk, getCartThunk } from "../../store/slices/cart.slice";




const Cart = ({ show, handleClose }) => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteProduct = (id) =>{
    dispatch(deletePorductCartThunk(id))
  }

 const cartPurchase = () =>{
  const objPurchase = {
    street: "Green St. 1456",
    colony: "Southwest",
    zipCode: 12345,
    city: "USA",
    references: "Some references",
  };
  dispatch(cartPurchaseThunk(objPurchase))
 }

  const totalPrice = () => {
    let totalPriceCart = 0;
    if (cart) {
      const cb = (acc, cv) => {
        return acc + cv.price * cv.productsInCart.quantity;
      }; totalPriceCart = cart.reduce(cb, 0);
    } return totalPriceCart;
  }

  useEffect(() => {
    dispatch(getCartThunk());
  }, []);

  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>My Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <section className="cart">
          <div>
            <div className="cart-title-container">
              <p className="cart-title-goback" onClick={()=>navigate("/")}>
                Home
              </p>
              <span></span>
              <p className="cart-title">My Cart</p>
            </div>

            <div className="cart__container">
              {cart?.map((productCart) => (
                <section key={productCart.id} className="cart-info">
                  <header className="cart-info__header">
                    <h4 className="cart-info__subtitle">{productCart.brand}</h4>
                    <h3 className="cart-info__title">{productCart.title}</h3>

                    <p className="cart-info__quantity">
                      {productCart.productsInCart.quantity}
                    </p>
                  </header>

                  <p className="cart-info__price">$ {productCart.price}</p>

                  <div className="cart-info__btn" onClick={()=>deleteProduct(productCart.id)}>
                    <i className="fa-solid fa-trash-can"></i>
                  </div>
                </section>
              ))}
            </div>
          </div>

          <div className="total-btnConfirm">
            {cart ? (
              <h2 className="cart__total">
                <span className="cart__total-label">Total: $</span>
                <span className="cart__total-number">{totalPrice()}</span>
              </h2>
            ) : (
              <h2 className="text-cart-null">No has agregado nada al carrito!</h2>
            )}
            {cart ? (
              <button className="cart__btn" onClick={()=>cartPurchase()}>
                Confirm Purchase
              </button>
            ) : null}
          </div>
        </section>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;