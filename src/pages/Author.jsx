import React, {useState, useEffect} from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Author = () => {
  let { userId } = useParams();
  const [dataSet, setDataSet] = useState(false);
  const [follow, setFollow] = useState(false);

  function followButton() {
    setFollow(!follow);
  }
  
  useEffect(() => {
    let data;
    async function getData() {
      ({data} = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=" + userId));
      setDataSet(data)
    }
    getData()
  }, [dataSet, follow])
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section
          id="profile_banner"
          aria-label="  section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>
        <section aria-label="section">
          <div className="container">
            <div className="row">
            {dataSet ?
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={dataSet.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {dataSet.authorName}
                          <span className="profile_username">{dataSet.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {dataSet.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div  className="profile_follow de-flex">
                    <div id="profile_follow" className="de-flex-col">
                      {follow ? <div className="profile_follower"> {dataSet.followers + 1} followers</div> : <div className="profile_follower"> {dataSet.followers} followers</div>}
                      <Link to="#" className="btn-main">
                      {!follow ? <div onClick={followButton}> Follow </div> : <div onClick={followButton}> Unfollow </div>}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
               : <div className="col">
               <div className="d_profile de-flex">
                 <div className="de-flex-col">
                   <div className="profile_avatar">
                     <div className="lazy-profile_pp"> </div>
                     <div className="profile_name">
                       <h4>
                         <div className="lazy-profile_name"></div>
                         <span className="profile_username lazy-profile_tag"> </span>
                         <span id="wallet" className="profile_wallet lazy-profile_wallet">

                         </span>

                       </h4>
                     </div>
                   </div>
                 </div>
                 <div className="profile_follow de-flex lazy-profile_follow">
                   <div className="de-flex-col">
                   </div>
                 </div>
               </div>
             </div> 
               }
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                <AuthorItems 
                  nftCollection={dataSet.nftCollection}
                  authorImage={dataSet.authorImage}
                  authorId = {dataSet.authorId}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
