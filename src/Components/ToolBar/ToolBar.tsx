import { NavLink } from 'react-router-dom';

const ToolBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container py-3">
        <NavLink to="/" className="nav-link navbar-brand text-light">
          Quotes
        </NavLink>

        <div className="collapse navbar-collapse ms-auto">
          <div className="navbar-nav ms-auto">
            <NavLink to="/" className="nav-item nav-link text-light mx-3">
              Home
            </NavLink>

            <NavLink
              to="/quotes/new-quote"
              className="nav-link nav-item text-light mx-3"
            >
              Add quote
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ToolBar;