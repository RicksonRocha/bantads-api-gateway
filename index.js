const http = require('http');
const express = require('express');
const httpProxy = require('express-http-proxy');

const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const helmet = require('helmet');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const sagaServiceProxy = httpProxy('http://localhost:9090');
const authServiceProxy = httpProxy('http://localhost:3001');
const customerServiceProxy = httpProxy('http://localhost:8080');
const managerServiceProxy = httpProxy('http://localhost:8081');
const accountServiceProxy = httpProxy('http://localhost:8081');

function genericProxy(req, res, next) {
  let targetProxy;
  const url = req.url;

  switch (true) {
    case url.startsWith('/api/saga'):
      targetProxy = sagaServiceProxy;
      break;
    case url.startsWith('/api/customer'):
      targetProxy = customerServiceProxy;
      break;
    case url.startsWith('/api/auth'):
      targetProxy = authServiceProxy;
      break;
    case url.startsWith('/api/gerente'):
      targetProxy = managerServiceProxy;
      break;
    case url.startsWith('/api/conta'):
      targetProxy = accountServiceProxy;
      break;
    default:
      targetProxy = null;
  }

  if (targetProxy) {
    targetProxy(req, res, next);
  } else {
    res.status(404).send('Endpoint não encontrado');
  }
}

app.use(genericProxy);

const server = http.createServer(app);
const port = 3000;
server.listen(port, () => {
  console.log(`API Gateway com proxy reverso rodando na porta ${port}`);
});
