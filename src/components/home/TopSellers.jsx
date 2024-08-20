import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";




const TopSellers = () => {
  const [dataSet, setDataSet] = useState(false);  
  let data;
  useEffect(() => {
    async function getData() {
      ({data} = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"))
      setDataSet(data)
    }
    getData()
  }, [])
  
  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {false ? dataSet.map((obj) => (
                <li key={obj.id}>
                  <div className="author_list_pp">
                    <Link to={`/author/${obj.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={obj.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${obj.authorId}`}>{obj.authorName}</Link>
                    <span>{obj.price} ETH</span>
                  </div>
                </li>
              ))  :new Array(12).fill(0).map((_, index) => (
                <li key={index}>
                  <div className="lazy-author_pp author_list_pp">
                      <i className="fa fa-check"></i>
                  </div>
                  <div className="author_list_info lazy-author_list_info">
                    <div className="lazy-author_name"></div>
                    <div className="lazy-author_price"></div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
