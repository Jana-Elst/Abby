import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.jsx"),
  route("/login", "routes/login.jsx"),
  route("/form", "routes/form.jsx"),
  route("/end", "routes/end.jsx"),
  route("/test", "routes/arduinoTest.jsx"),
];
