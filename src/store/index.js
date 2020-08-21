import { setGlobal } from "reactn";

import notification from "./notification";
import auth from "./auth";

export default function initStore(params) {
  setGlobal({
    notification,
    auth
  });
}
