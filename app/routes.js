
import { route, index, layout, prefix } from "@react-router/dev/routes";
import viteConfig from '../vite.config';

const base = viteConfig.base ?? '/';


export default [
  ...prefix(base, [
    layout("layouts/header.jsx", [
      layout("layouts/footer.jsx", [
        index("routes/home.jsx"),
      ]),
      route("/log-in", "routes/accountPage.jsx"),
      route("/abbymomenten", "routes/abbymoments.jsx"),
      route("/jouw-abbymomenten", "routes/yourAbbymoments.jsx"),
      route("/maak-een-abbymoment", "routes/createAbbymomentStart.jsx"),
      route("/abbymomenten/:abbymomentId", "routes/detailAbbymoments.jsx"),
    ]),
    route("/qrCode", "routes/qrCode.jsx"),
    route("/maak-een-abbymoment/formulier", "routes/createAbbymoment.jsx"),
  ])
];