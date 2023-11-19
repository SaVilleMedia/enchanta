const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/api/",
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true,
      timeout: 60000, // Set a longer timeout value (in milliseconds)
    })
  );
};
