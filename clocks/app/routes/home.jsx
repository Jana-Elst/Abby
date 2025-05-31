import { useOutletContext, NavLink } from "react-router";
import { sendToServer } from "../services/clock";

const Home = () => {
  const { ws, clock } = useOutletContext();

  return (
    <>
      <h1>Start je activiteit nu!</h1>
      <NavLink to="/login">Login</NavLink>
    </>
  );
};

export default Home;