import { Link } from "react-router-dom";

const Card = ({
  card: { _id, bizImage, bizName, bizDescription, bizAddress, bizPhone },
}) => {
  return (
    <>
      <div className="card" style={{ width: " 18rem" }}>
        <img src={bizImage} className="card-img-top" alt={bizName} />
        <div className="card-body">
          <h5 className="card-title">{bizName}</h5>
          <p className="card-text">{bizDescription}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <i className="bi bi-telephone"></i> {bizPhone}
          </li>
          <li className="list-group-item">
            <i className="bi bi-geo-alt"></i>
            {bizAddress}
          </li>
        </ul>
        <div className="card-body">
          <Link to={`/my-cards/edit/${_id}`} className="card-link">
            edit
          </Link>
          <Link to={`/my-cards/delete/${_id}`} className="card-link">
            delete
          </Link>
        </div>
      </div>
    </>
  );
};
export default Card;
