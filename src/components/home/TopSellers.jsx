import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
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
  offset: 0, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});



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
      <div data-aos="fade-up" data-aos-offset="-600" className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {dataSet ? dataSet.map((obj) => (
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
