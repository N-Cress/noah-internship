import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";

const ItemDetails = () => {
  const [dataSet, setDataSet] = useState(false);

  let { nftId } = useParams();
  let data;

  useEffect(() => {
    window.scrollTo(0, 0);
    async function getData() {
      ({data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`))
      setDataSet(data)
    }
    getData();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            {dataSet ? 
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={dataSet.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{dataSet.title}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {dataSet.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {dataSet.likes}
                    </div>
                  </div>
                  <p>
                    {dataSet.description}
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${dataSet.ownerId}`}>
                            <img className="lazy" src={dataSet.ownerImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${dataSet.ownerId}`}>{dataSet.ownerName}</Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${dataSet.creatorId}`}>
                            <img className="lazy" src={dataSet.creatorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to="/author">{dataSet.creatorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{dataSet.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div> : 
            <div className="row">
            <div className="lazy-nft-image_wrap col-md-6 text-center">
              <div className="img-fluid img-rounded mb-sm-30 nft-image lazy-nft-image"></div>
            </div>
            <div className="col-md-6">
              <div className="item_info">
                <div className="lazy-nft_title"></div>
                <div className="lazy-nft_count">
                  <div className="item_info_views">
                    <div className="lazy-nft_views"></div>
                  </div>
                  <div >
                    <div className="lazy-nft_likes"></div>
                  </div>
                </div>
                <div className="lazy-nft_description"></div>
                <div className="d-flex flex-row">
                  <div className="mr40">
                    <h6>Owner</h6>
                    <div className="lazy-item_author item_author">
                      <div className="author_list_pp lazy-nft_author_pp">
                      </div>
                      <div className="author_list_info">
                        <div className="lazy-nft_author_name"></div>
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>
                <div className="de_tab tab_simple">
                  <div className="de_tab_content">
                    <h6>Creator</h6>
                    <div className="lazy-item_creator item_author">
                      <div className="author_list_pp">
                      <div className="author_list_pp lazy-nft_author_pp">
                      </div>
                      <div className="author_list_info">
                        <div className="lazy-nft_author_name"></div>
                      </div>
                    </div>
                  </div>
                  <div className="spacer-40"></div>
                  <h6>Price</h6>
                  <div className="nft-item-price">
                    <div className="lazy-nft_price"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
            }
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
