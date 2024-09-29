import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../DataProvider/DataProvider";
import { auth, db } from "../../Utility/firebase";
import { Type } from "../../Utility/action.type";
import { Link } from "react-router-dom";
import classes from "./Orders.module.css";
import ProductCard from "../../components/Product/ProductCard";

function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
      if (user) {
        db.collection("users").doc(user?.uid).collection("orders").orderBy("created", "desc").onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        })
      } else {
        setOrders([]);
      }
    
  }, []);
  return (
    <section className={classes.container}>
      <div className={classes.orders_container}>
        <h2 style={{ textAlign: "center" }}>Your Orders</h2>
        <div>
          {
            orders?.length === 0 && (
              <h3 style={{ textAlign: "center", padding: "20px"}}>No orders yet</h3> 
          )}
        </div>
        {/* ordered items */}
        <div>
           {
             orders?.map((order) => {
               return (
                 <div key={order.id}>
                  <hr />
                   <h3>Order Id: {order?.id}</h3>
                   {/* <div className={classes.order__items}> */}
                     {
                       order?.data?.basket?.map((item) => {
                         return (
                           <ProductCard key={item.id} product={item} flex={true}/>
                         )
                       })
                     }
                   {/* </div> */}
                   {/* <p className={classes.order__total}>Total: ${order.data.amount}</p> */}
                 </div>)
             })
           }
        </div>
      </div>
    </section>
  );
}

export default Orders;
