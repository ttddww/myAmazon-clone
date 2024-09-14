import React from "react";
import { MdMenu } from "react-icons/md";
import classes from './Header.module.css'

function LowerHeader() {
  return (
    <div className={classes.LowerHeader}>
      <ul>
        <li>
          <MdMenu />
          <p>All</p>
        </li>
        <li>Today's Deals</li>
        <li>Customer Service</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}

export default LowerHeader;
