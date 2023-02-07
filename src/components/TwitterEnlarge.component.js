export default function TwitterEnlarge({ image, socialContent }) {
  return (
    <div className="twitterPostWrap">
      <div className="twitterHeadImgWrap">
        <img
          src="https://randomuser.me/api/portraits/women/11.jpg"
          alt=""
          className="twitterHeadImg"
        />
      </div>
      <div className="twitterPostHeadWrap">
        <div className="twitterUserDetails">
          <div className="twitterUserName">
            <h4>Mygreatbrand</h4>
            <p>@greatBrand</p>
            <p>52s</p>
          </div>
          <div className="twitterPostdesc">
            <h5>
            {socialContent && socialContent.length && socialContent[3] && socialContent[3].social[0].Content}
            </h5>
          </div>
          {/* <div className="twitterHashtag">
            <h5>#Viral#trending</h5>
          </div> */}
        </div>
        <span className="twitterShowMore">
          <i className="fa-solid fa-ellipsis"></i>
        </span>
        <div className="twitterPostImgWrap">
          <img src={image} alt="" className="twitterPostImg" />
        </div>
        <div className="twitterCommentWrap">
          <div className="twitterCmtTab">
            <i className="fa fa-message"></i>
            <span className="ms-2">12</span>
          </div>
          <div className="twitterCmtTab">
            <i className="fa fa-retweet"></i>
            <span className="ms-2">4</span>
          </div>
          <div className="twitterCmtTab">
            <i className="fa fa-heart"></i>
            <span className="ms-2">56</span>
          </div>
          <div className="twitterCmtTab">
            <i className="fa fa-upload"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
