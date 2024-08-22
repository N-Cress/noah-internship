import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

AOS.init();

// You can also pass an optional settings object
// below listed default settings
AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
  

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});

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
      <div data-aos="fade-up" className="container">
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
