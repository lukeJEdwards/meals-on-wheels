import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons';
import {
  faSignOutAlt,
  faCog,
  faAngleDoubleLeft,
  faPlus,
  faTimes,
  faMinus,
  faSearch,
  faChevronLeft,
  faUserEdit,
  faSync,
  faSave
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faSignOutAlt,
  faCog,
  faAngleDoubleLeft,
  faPlus,
  faTimes,
  faMinus,
  faSearch,
  faChevronLeft,
  faArrowAltCircleLeft,
  faUserEdit,
  faSync,
  faSave
);

Vue.component('fa-icon', FontAwesomeIcon);
