import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowAltCircleLeft,
  faMinus,
  faPlus,
  faSignInAlt,
  faSignOutAlt,
  faSpinner,
  faSync,
  faTimes,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faSignInAlt,
  faArrowAltCircleLeft,
  faSignOutAlt,
  faSync,
  faSpinner,
  faPlus,
  faUserEdit,
  faMinus,
  faTimes
);

Vue.component("fa-icon", FontAwesomeIcon);
