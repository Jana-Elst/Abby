import { route, layout, index } from "@react-router/dev/routes";

export default [
  index("routes/home.jsx"),
  route("/campaign", "routes/homeCampaign.jsx"),
  route("/arduino", "routes/homeArduino.jsx")
];
