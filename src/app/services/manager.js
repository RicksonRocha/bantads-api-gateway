const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const router = express.Router();

const managerProxy = createProxyMiddleware({
  target: "http://localhost:8080/api/",
  changeOrigin: true,
});

router.get("/dashboard", managerProxy);
router.get("/customers", managerProxy);
router.get("/customer/:id", managerProxy);
router.get("/best-customers", managerProxy);

router.put("/approve-customer/:id", managerProxy);
router.put("/reject-customer/:id", managerProxy);

module.exports = router;
