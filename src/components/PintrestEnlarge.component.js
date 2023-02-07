export default function PintrestEnlarge({ image, socialContent }) {
  return (
    <div className="container">
      <div className="card-columns">
        <div className="card">
          <img className="card-img-top" src={image} alt="Card image cap" />
          <div className="card-block py-2">
            <span className="card-title ps-3">
              From <b>leading brand</b>
            </span>
            <p className="card-text ps-3">Marquee</p>
          </div>
          <div className="card-footer">
            <small>{socialContent && socialContent.length && socialContent[2] && socialContent[2].social[0].Content}</small>
          </div>
        </div>
      </div>
    </div>
  );
}
