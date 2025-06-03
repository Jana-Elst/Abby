import { route, index, prefix } from "@react-router/dev/routes";
import viteConfig from '../vite.config';

const base = viteConfig.base ?? '/';

export default [
  ...prefix(base, [
    index("routes/home.jsx"),
    route("/account", "routes/accountPage.jsx"),
  ])
];
