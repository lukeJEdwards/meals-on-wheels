import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faSignOutAlt,
  faSearch,
  faUserPlus,
  faUserMinus,
  faPlus,
  faTimes
} from "@fortawesome/free-solid-svg-icons";

library.add(faSignOutAlt, faSearch, faUserPlus, faUserMinus, faPlus, faTimes);

Vue.component("fa-icon", FontAwesomeIcon);
