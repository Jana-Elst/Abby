import { useOutletContext, NavLink } from "react-router";

// import ClockList from "../components/clockList";
import { getMuseumClocks } from "../services/dataArduino";

export async function clientLoader() {
  const museumClocks = await getMuseumClocks();
  console.log(museumClocks);

  return { museumClocks };
}


const Home = ({ loaderData }) => {
  const { ws, clock } = useOutletContext();
  const { museumClocks } = loaderData
  console.log(museumClocks);

  return (
    <>
      <p>campaign</p>
      <NavLink to="/login">Login</NavLink>
    </>

  )
};

export default Home;