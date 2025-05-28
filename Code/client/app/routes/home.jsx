import { NavLink } from "react-router";

const HomeRoute = () => {
  return (
    <nav>
      <NavLink to="/campaign">Campaign</NavLink>
      <NavLink to="/arduino">Arduino</NavLink>
    </nav>
  )
};

export default HomeRoute;
