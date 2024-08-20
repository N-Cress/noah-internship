import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const NewItems = () => {
  const [dataSet, setDataSet] = useState([]);
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    async function getData() {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      );
      setDataSet(data);

      
      const initialTimes = data.reduce((acc, obj) => {
        acc[obj.id] = obj.expiryDate - Date.now();
        return acc;
      }, {});
      setTimeLeft(initialTimes);
    }
    getData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimes) => {
        const newTimes = {};
        for (const id in prevTimes) {
          if (prevTimes.hasOwnProperty(id)) {
            newTimes[id] = Math.max(prevTimes[id] - 1000, 0);
          }
        }
        return newTimes;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (millis) => {
    const secondsLeft = millis / 1000;
    const minutesLeft = secondsLeft / 60;
    const hoursLeft = minutesLeft / 60;

    const secondsText = Math.floor(secondsLeft % 60);
    const minutesText = Math.floor(minutesLeft % 60);
    const hoursText = Math.floor(hoursLeft % 24);

    return `${hoursText} h ${minutesText} m ${secondsText} s`;
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {dataSet.length
            ? dataSet.map((obj) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={obj.id}>
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
                    {obj.expiryDate ? (
                      <div className={`de_countdown`}>
                        {formatTime(timeLeft[obj.id])}
                      </div>
                    ) : (
                      <div> </div>
                    )}

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

                      <Link to="/item-details">
                        <img
                          src={obj.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>{obj.title}</h4>
                      </Link>
                      <div className="nft__item_price">{obj.price}</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{obj.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : new Array(4).fill(0).map((_, index) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to="/author"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy" src={AuthorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="de_countdown">5h 30m 32s</div>

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

                      <Link to="/item-details">
                        <img
                          src={nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>Pinky Ocean</h4>
                      </Link>
                      <div className="nft__item_price">3.08 ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>69</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
