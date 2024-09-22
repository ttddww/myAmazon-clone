import React, { useContext } from 'react'
import { IoLocationOutline } from "react-icons/io5";
import { GoSearch } from "react-icons/go";
import classes from './Header.module.css'
import LowerHeader from './LowerHeader';
import { Link } from "react-router-dom";
import { DataContext } from '../../DataProvider/DataProvider';

function Header() {
  const [{ basket }, dispatch] = useContext(DataContext);

  const totalItem = basket.reduce((amount, item) => {
    return item.amount + amount
  }, 0)

  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.Header_container}>
          <div className={classes.logo_container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon logo"
              />
            </Link>
            <div className={classes.location}>
              {/* location icon */}
              <IoLocationOutline size={30} />
              <div>
                <h6>Deliver to</h6>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>
          <div className={classes.search_container}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" placeholder="Search Amazon" />
            {/* search icon */}
            <GoSearch size={40} />
          </div>
          <div className={classes.order_container}>
            <Link to="" className={classes.flag}>
              <span>
                <img
                  src="https://pngimg.com/uploads/flags/flags_PNG14592.png"
                  alt="american flag"
                />
              </span>
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </Link>
            <Link to="/">
              <p>Hello, Sign In</p>
              <span>Account & Lists</span>
            </Link>
            <Link to="/">
              <p>Returns</p>
              <span>& Orders</span>
            </Link>
            <Link to="/cart" className={classes.cart}>
              <img
                src="https://media.wired.com/photos/59325eba9be5e55af6c246eb/master/pass/amazoncart-feat.jpg"
                alt="shopping cart"
              />
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
}

export default Header;