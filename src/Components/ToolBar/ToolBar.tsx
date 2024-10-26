import { NavLink } from 'react-router-dom';
import { categories } from '../../Helpers/categories.ts';

const ToolBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container py-3">
        <NavLink to="/" className="nav-link navbar-brand text-light">
          Quotes
        </NavLink>

        <div className="collapse navbar-collapse ms-auto">
          <div className="navbar-nav ms-auto">
            <NavLink to="/" className="nav-item nav-link text-light px-3 py-0">
              All
            </NavLink>
            {categories.map(category => (
              <NavLink
                to={`/quotes/${category.id}`}
                key={category.id}
                className="nav-item nav-link text-light px-3 py-0"
              >
                {category.title}
              </NavLink>
            ))}

            <NavLink
              to="/quotes/new-quote"
              className="nav-link nav-item text-light px-3 py-0 border-start text-uppercase"
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