import React, { useContext } from "react";
import ProductCard from "../../components/Product/ProductCard";
import { DataContext } from "../../DataProvider/DataProvider";
import CurrencyFormater from "../../components/CurrencyFormater/CurrencyFormater";
import { Link } from "react-router-dom";
import classes from "./Cart.module.css";
import { Type } from "../../Utility/action.type";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { FaArrowAltCircleUp } from "react-icons/fa";

function Cart() {
  const [{ basket }, dispatch] = useContext(DataContext);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  console.log(basket);

  const increament = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: item,
    });
  };
  const decreament = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id: id,
    });
  };

  return (
    <section className={classes.container}>
      <div className={classes.card_container}>
        <h2>Hello</h2>
        <h3>Your shopping basket</h3>
        <hr />
        {basket?.length == 0 ? (
          <p>Your basket is empty</p>
        ) : (
          basket?.map((item, i) => (
            <section className={classes.card_product}>
              <ProductCard
                key={i}
                product={item}
                renderDesc={true}
                renderAdd={false} 
                flex={true}
              />
              <div className={classes.btn_container}>
                <button className={classes.btn} onClick={() => increament(item)}>
                  <FaArrowAltCircleUp size={30} />
                </button>
                <span>{item.amount}</span>
                <button className={classes.btn} onClick={() => decreament(item.id)}>
                  <FaArrowAltCircleDown size={30} />
                </button>
              </div>
            </section>
          ))
        )}
      </div>
      {basket?.length !== 0 && (
        <div className={classes.subtotal}>
          <div>
            <p>Subtotal ({basket?.length}items)</p>
            <CurrencyFormater amount={total} />
          </div>
          <span>
            <input type="checkbox" />
            <small>This order contains a gift</small>
          </span>
          <Link to="/payment">Continue to checkout</Link>
        </div>
      )}
    </section>
  );
}

export default Cart;
