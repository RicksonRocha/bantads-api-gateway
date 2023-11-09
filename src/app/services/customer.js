const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const router = express.Router();

const customerProxy = createProxyMiddleware({
  target: 'http://localhost:8080/',
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
  customerProxy(req, res, (error) => {
    if (error) {
      res.status(500).json({ error: 'Erro ao acessar o serviço de cliente' });
    } else {      
      const customer = res.locals.data; 
      res.json(customer);
    } 
  })
});

router.post('/', (req, res) => {
  customerProxy(req, res, (error) => {
    if (error) {
      res.status(500).json({ error: 'Erro ao acessar o serviço de cliente' });
    } else {      
      const customer = res.locals.data; 
      res.json(customer);
    } 
  })
});


module.exports = router;
