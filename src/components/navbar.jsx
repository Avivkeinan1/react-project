import { NavLink } from "react-router-dom";
import { useAuth } from "../context/authContext";

const NavBar = () => {
  const { user } = useAuth();

  return (
    <nav
      className="navbar navbar-expand-sm navbar-light bg-light"
      aria-label="Third navbar example"
    >
      <div className="container-fluid">
        <NavLink to="react-project" className="navbar-brand">
          First <i className="bi bi-google-play"></i>App
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample03"
          aria-controls="navbarsExample03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample03">
          <ul className="navbar-nav me-auto mb-2 mb-sm-0">
            {user?.biz && (
              <>
                <li className="nav-item">
                  <NavLink to="my-cards" className="nav-link active">
                    My-Cards
                  </NavLink>
                </li>
              </>
            )}

            <li className="nav-item">
              <NavLink to="about" className="nav-link">
                About
              </NavLink>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto mb-2 mb-sm-0">
            {user ? (
              <li className="nav-item">
                <NavLink to="logout" className="nav-link active">
                  log-out
                </NavLink>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink to="sign-in" className="nav-link active">
                    Sign-in
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="sign-up" className="nav-link">
                    Sign-up
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="sign-up-biz" className="nav-link">
                    Sign-up Business
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
