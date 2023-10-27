import { Outlet, Link } from "react-router-dom";

const LayoutComponent = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Jobs</Link>
          </li>
          <li>
            <Link to="/translators">Translators</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default LayoutComponent;