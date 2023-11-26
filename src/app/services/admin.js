const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const router = express.Router();

const adminProxy = createProxyMiddleware({
  target: "http://localhost:8080/api/",
  changeOrigin: true,
});

router.post("/managers", adminProxy);

router.get("/dashboard", adminProxy);
router.get("/customers-report", adminProxy);
router.get("/managers", adminProxy);
router.get("/managers/:id", adminProxy);

router.put("/managers/:id", adminProxy);

router.delete("/managers/:id", adminProxy);

module.exports = router;
