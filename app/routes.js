
import { route, index, layout, prefix } from "@react-router/dev/routes";
import viteConfig from '../vite.config';

const base = viteConfig.base ?? '/';


export default [
  ...prefix(base, [
    layout("layouts/header.jsx", [
      layout("layouts/footer.jsx", [
        index("routes/home.jsx"),
        route("/mijn-activiteiten", "routes/myClocks.jsx"),
        route("/log-in", "routes/accountPage.jsx"),
        route("/alle-activiteiten", "routes/allClocks.jsx"),
        route("/activiteit-maken", "routes/createClocks.jsx"),
        route("/activiteit/:activiteitId", "routes/detailClock.jsx"),
      ])
    ]),
    route("/maak-activiteit", "routes/createClockForm.jsx"),
    route("/muur-vol-klokjes", "routes/wallStart.jsx"),
    route("/jouw-klokje", "routes/wallSucces.jsx"),
  ])
];
