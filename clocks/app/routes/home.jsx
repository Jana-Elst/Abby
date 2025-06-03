import { useOutletContext } from "react-router";

const handleClick = (data, socket) => {
  socket.send(JSON.stringify({
    type: "button",
    value: `${data}`
  }));
}

const Home = () => {
  const socket = useOutletContext();

  return (
    <>
      <button className="button" onClick={() => handleClick("1.1", socket)}>red 1</button>
      <button className="button" onClick={() => handleClick("1.2", socket)}>yellow 1</button>
      <button className="button" onClick={() => handleClick("1.3", socket)}>green 1</button>
      <button className="button" onClick={() => handleClick("2.1", socket)}>red 2</button>
      <button className="button" onClick={() => handleClick("2.2", socket)}>yellow 2</button>
      <button className="button" onClick={() => handleClick("2.3", socket)}>green 2</button>
    </>
  );
};

export default Home;
