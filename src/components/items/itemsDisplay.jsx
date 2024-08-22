import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import TimeLeft from "./TimeLeft";

function ItemsDisplay({link, settings, lazySize, displayAmount}) {
    const [dataSet, setDataSet] = useState([false]);
    useEffect(() => {
        async function getData() {
            try {
                const { data } = await axios.get(link);
                setDataSet(data.slice(0, displayAmount));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        getData();
    }, [link, displayAmount]);

      
  return (
    <div>

        {settings ? <Slider {...settings}>
            {dataSet ? dataSet.map((obj) => (
            <div className="col" key={obj.id}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${obj.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={`Creator: ${obj.author}`}
                  >
                    <img className="lazy" src={obj.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <TimeLeft expiryDate={obj.expiryDate}> </TimeLeft>
    
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
    
                  <Link to={`/item-details/${obj.nftId}`}>
                    <img
                      src={obj.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${obj.nftId}`}>
                    <h4>{obj.title}</h4>
                  </Link>
                  <div className="nft__item_price">{obj.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{obj.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        : new Array(lazySize).fill(0).map((_, index) => (
            <div className="col" key={index}>
              <div className="nft__item">
                <div className="lazy-author_pp author_list_pp">
                    <i className="fa fa-check"></i>
                </div>
                <div className="lazy-nft__item_wrap nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="nft__item_info">
                <div className="lazy-item_title"> </div>
                  <div className="nft__item_price lazy-item_price"> </div>
                  <div className="nft__item_like lazy-item_like"> </div>
                </div>
              </div>
            </div>
          ))}
            </Slider>
            : <div className="filler">
            {dataSet ? dataSet.map((obj) => (
            <div className="col-lg-3 col-md-4 col-sm-6" key={obj.id}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${obj.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={`Creator: ${obj.author}`}
                  >
                    <img className="lazy" src={obj.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <TimeLeft expiryDate={obj.expiryDate}> </TimeLeft>
    
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
    
                  <Link to={`/item-details/${obj.nftId}`}>
                    <img
                      src={obj.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${obj.nftId}`}>
                    <h4>{obj.title}</h4>
                  </Link>
                  <div className="nft__item_price">{obj.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{obj.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        : new Array(lazySize).fill(0).map((_, index) => (
            <div className="col-3" key={index}>
              <div className="nft__item">
                <div className="lazy-author_pp author_list_pp">
                    <i className="fa fa-check"></i>
                </div>
                <div className="lazy-nft__item_wrap nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="nft__item_info">
                <div className="lazy-item_title"> </div>
                  <div className="nft__item_price lazy-item_price"> </div>
                  <div className="nft__item_like lazy-item_like"> </div>
                </div>
              </div>
            </div>
          ))}
          </div>
        }
    </div>
  );
};

export default ItemsDisplay;
