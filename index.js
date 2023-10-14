const express = require('express');
const app = express();
const port = 3000;
const customerService = require('./app/services/customer');
const authService = require('./app/services/customer');

app.use('/customer', customerService);
app.use('/auth', authService);

app.listen(port, () => {
  console.log(`API Gateway com proxy reverso rodando na porta ${port}`);
});
