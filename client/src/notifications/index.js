import Vue from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const options = {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
  filterToasts: (toasts) => {
    // Keep track of existing types
    const types = {};
    return toasts.reduce((aggToasts, toast) => {
      // Check if type was not seen before
      if (!types[toast.type]) {
        aggToasts.push(toast);
        types[toast.type] = true;
      }
      return aggToasts;
    }, []);
  },
};

Vue.use(Toast, options);
