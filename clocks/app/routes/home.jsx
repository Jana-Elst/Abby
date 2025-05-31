import { NavLink } from "react-router";

const Home = () => {
  return (
    <>
      <h1>Start je activiteit nu!</h1>
      <NavLink to="/login">Login</NavLink>
    </>
  );
};

export default Home;