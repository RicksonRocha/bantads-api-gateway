const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const router = express.Router();

const sagaProxy = createProxyMiddleware({
  target: 'http://localhost:9090/',
  changeOrigin: true,
});

router.post('/customer', (req, res) => {
    sagaProxy(req, res, (error) => {
        if (error) {
          res.status(500).json({ error: 'Erro ao acessar o serviço de cliente' });
        } else {
          const customer = res.locals.data; 
          res.json(customer);
        }
    });
});

module.exports = router;
