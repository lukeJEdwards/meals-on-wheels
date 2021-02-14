const path = require("path");
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/scss/_main.scss";`
      }
    }
  },
  outputDir: path.resolve(__dirname, "../server/public")
};
