
import { route, index, layout } from "@react-router/dev/routes";

export default [
  layout("layouts/header.jsx", [
     index("routes/home.jsx"),
     route("/mijn-activiteiten", "routes/myClocks.jsx"),
    route("/log-in", "routes/AccountPage.jsx"),
     route("/alle-activiteiten", "routes/allClocks.jsx"),
     route("/activiteit-maken", "routes/createClocks.jsx"),
     route("/activiteit/:activiteitId", "routes/detailClock.jsx"),
  ]),
  route("/maak-activiteit", "routes/createClockForm.jsx"),
  route("/muur-vol-klokjes", "routes/wallStart.jsx"),
  route("/jouw-klokje", "routes/wallSucces.jsx"),
];
