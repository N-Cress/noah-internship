import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import ItemsDisplay from "../items/itemsDisplay";

const ExploreItems = () => {
  const link = "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
  const [amount, setAmount] = useState(8);

  const displayMore = () => {
    setAmount(prevAmount => prevAmount + 4);
  };

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      <ItemsDisplay
        link={link}
        lazySize={8}
        displayAmount={amount}
      />
      <div className="col-md-12 text-center">
        {amount !== 16 ? <Link to="" id="loadmore" className="btn-main lead">
          <div onClick={displayMore}>Load more</div>
        </Link> : <></>
          }
    
      </div>
    </>
  );
};

export default ExploreItems;
