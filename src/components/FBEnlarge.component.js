export default function FBEnlarge({ image, socialContent }) {
  return (
    <div className="fb-cards-designs">
      <div className="fb-clone-card">
        <div className="fb-card-main-content">
          <div className="fb-card-header">
            <div className="user-post-info">
              <div className="user-thumb">
                <img
                  src="https://randomuser.me/api/portraits/women/11.jpg"
                  className="img-responsive"
                />
              </div>
              <div className="user-information">
                <p>Leona Gutierrez</p>
                <small>Sponsored</small>
              </div>
            </div>
            <div className="post-action">
              <i className="fas fa-ellipsis-h"></i>
            </div>
          </div>

          <div className="fb-card-body simple-text-card simple-image-card simple-image-post">
            <div className="images-container">
              <img src={image} className="img-responsive" />
              <div className="sponsord-post-title-links">
                <small>medium.com/@karthikricssion</small>
                <h5>{socialContent && socialContent.length && socialContent[1] && socialContent[1].social[0].Content}</h5>
              </div>
            </div>
          </div>
        </div>

        <div className="fb-card-like-comment-holder">
          <div className="fb-card-like-comment">
            <div className="likes-emoji-holder">
              <span>6.6k</span>
            </div>
            <div className="like-comment-holder">
              <span>786 Commnets</span>
              <span>2K Shares</span>
            </div>
          </div>
        </div>

        <div className="fb-card-actions-holder">
          <div className="fb-card-actions">
            <div className="fb-btn-holder">
              <a href="#">
                <i className="far fa-thumbs-up"></i> Like
              </a>
            </div>
            <div className="fb-btn-holder">
              <a href="#">
                <i className="far fa-comment-alt"></i> Comment
              </a>
            </div>
            <div className="fb-btn-holder">
              <a href="#">
                <i className="far fa-share-square"></i> Share
              </a>
            </div>
          </div>
        </div>

        <div className="fb-card-comments">
          <div className="comment-input-holder">
            <div className="user-thumb">
              <img
                src="https://randomuser.me/api/portraits/women/85.jpg"
                className="img-responsive"
              />
            </div>
            <div className="comment-input">
              <div
                className="comment-box"
                placeholder="Write a comment..."
                contentEditable="true"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
