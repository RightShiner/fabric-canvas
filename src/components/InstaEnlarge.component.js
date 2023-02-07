export default function InstaEnlarge({ image, socialContent }) {
  return (
    <div className="postWrap">
      <div className="postHeadWrap">
        <div className="headImgWrap">
          <img
            src="https://images.unsplash.com/photo-1618588507085-c79565432917"
            alt=""
            className="headImg"
          />
        </div>
        <div className="userDetails">
          <h4 className="userName">RisingBrand</h4>
          <i className="fa-solid fa-circle-small timeIcon"></i>
          <h4 className="postTime">1h</h4>
        </div>
        <span className="showMore">
          <i className="fa fa-ellipsis"></i>
        </span>
      </div>
      <div className="instapostImgWrap">
        <img src={image} alt="" className="postImg" />
      </div>
      <div className="postIcons">
        <i className="fa-solid fa-heart"></i>
        <i className="fa-solid fa-comment"></i>
        <i className="fa-solid fa-paper-plane"></i>
        <i className="fa-solid fa-bookmark markIcon"></i>
      </div>
      <div className="postDetails">
        <p className="m-0">63 likes</p>
        <h4>
          {socialContent && socialContent.length && socialContent[0].social[0].Content}
        </h4>
        {/* <h4 className="text-info">#viral#trending</h4> */}
        <h6>see translation</h6>
      </div>
      <div className="postComments">
        <h4>view all comments</h4>
        <div className="searchComments">
          <p>add a comment...</p>
          <i className="fa fa-lg fa-face-smile"></i>
        </div>
      </div>
    </div>
  );
}
