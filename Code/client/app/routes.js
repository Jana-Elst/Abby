import { route, index } from "@react-router/dev/routes";

export default [
  index("routes/home.jsx"),
  route("/account", "routes/accountPage.jsx"),
];
