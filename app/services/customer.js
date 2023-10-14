const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const router = express.Router();

const customerProxy = createProxyMiddleware({
  target: 'http://localhost:8080/api/',
  changeOrigin: true,
});

router.get(`/`, (req, res) => {
    customerProxy(req, res, (error) => {
        if (error) {
          res.status(500).json({ error: 'Erro ao acessar o serviço de cliente' });
        } else {
          const customers = res.locals.data; 
          res.json(customers);
        }
      });
});

router.get('/:id', (req, res) => {
    // ...
});

router.post('/', (req, res) => {
    // ...
});

router.put('/:id', (req, res) => {
    // ...
});

router.delete('/:id', (req, res) => {
    // ...
});

module.exports = router;
