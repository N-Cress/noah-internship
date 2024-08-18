import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HotCollections = () => {
  const [dataSet, setDataSet] = useState(false);
  let data;

  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 756,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  
  useEffect((
  ) => {
    async function getData() {
      ({data} = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"))
      setDataSet(data)
    }
    getData()
    
  }, [])
  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Slider {...settings}>
          { !!dataSet ? dataSet.map((obj) => (
            <div className="col"key={obj.id}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to={`/item-details/` + obj.nftId}>
                    <img src={obj.nftImage} className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to={`/author/` + obj.authorId}>
                    <img className="lazy pp-coll" src={obj.authorImage} alt="" />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{obj.title}</h4>
                  </Link>
                  <span>{obj.code}</span>
                </div>
              </div>
            </div> 
          )) : new Array(4).fill(0).map((_, index) => (
            <div className="col" key={index}>
              <div className="nft_coll">
                <div className="lazy-nft_wrap nft_wrap">
                    <div className="lazy__img-fluid" > </div>
                </div>
                <div className="nft_coll_pp">
                    <div className="lazy-pp_coll lazy pp-coll" alt="" > </div>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">                
                    <div className="lazy-title"></div>
                  <div className="lazy-code"></div>
                </div>
              </div>
            </div>
          ))}
          </Slider>
         
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
