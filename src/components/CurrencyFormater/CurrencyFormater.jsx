import React from 'react'
import numeral from 'numeral'

const CurrencyFormater = ({amount}) => {
  
    const formatedAmount = numeral(amount).format("$0,0.00");

  return <div>{formatedAmount}</div>;
}

export default CurrencyFormater;
