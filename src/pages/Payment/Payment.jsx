import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import { DataContext } from "../../DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormater from "../../components/CurrencyFormater/CurrencyFormater";
import axiosInstance from "../../Api/axios";
import { RingLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";

function Payment() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  console.log(user);
  // total items
  const totalItem = basket.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  // total price
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleChange = async (e) => {
    // console.log(e);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);
      // backend payment
      const response = await axiosInstance({
        method: "post",
        url: `/payments/create?total=${total * 100}`,
      });
      console.log(response.data);
      const clientSecret = response.data?.clientSecret;
      // client side(react side) conformation
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      // console.log(conformation);
      // deposit into database
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
      // clear basket
      dispatch({ type: Type.EMPTY_BASKET });
      setProcessing(false);
      navigate("/orders", { state: { msg: "you have placed new order" } });
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };
  return (
    <section>
      <div className={classes.payment_header}>
        Check Out ({totalItem}) Items in Your Cart
      </div>
      <div className={classes.payment_container}>
        {/* address */}
        <div>
          <div className={classes.flex}>
            <h3>Delivery Address</h3>
            <div>
              <div>{user?.email} </div>
              <div>200 sanse ave</div>
              <div>Adrian, SC 29401</div>
            </div>
          </div>
        </div>
        <hr />
        {/* products */}
        <div className={classes.flex}>
          <h3>Review Items and Delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard key={item.id} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* payment method(card) */}
        <div className={classes.flex}>
          <h3>Payment Method</h3>
          <div className={classes.card_container}>
            <div className={classes.card_form}>
              <form onSubmit={handleSubmit}>
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card element */}
                <CardElement onChange={handleChange} />
                {/* price */}
                <div className={classes.payment_price}>
                  <div>
                    <span>
                      Total Order | <CurrencyFormater amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.processing}>
                        <RingLoader color="black" size={20} />
                        <p>please wait...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </section>
  );
}

export default Payment;
