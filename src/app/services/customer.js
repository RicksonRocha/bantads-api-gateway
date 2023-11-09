const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const router = express.Router();

const customerProxy = createProxyMiddleware({
  target: "http://localhost:8080/",
  changeOrigin: true,
});

router.post("/deposit", customerProxy);
router.post("/withdraw", customerProxy);
router.post("/transfer", customerProxy);

router.get("/:id", customerProxy);
router.get("/dashboard", customerProxy);
router.get("/transactions", customerProxy);

router.put("/profile/:id", customerProxy);

module.exports = router;
