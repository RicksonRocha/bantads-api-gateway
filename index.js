const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const customerService = require("./src/app/services/customer");
const managerService = require("./src/app/services/manager");
const adminService = require("./src/app/services/admin");
const authService = require("./src/app/services/auth");
const sagaService = require("./src/app/services/saga");

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/customer", customerService);
app.use("/api/manager", managerService);
app.use("/api/admin", adminService);
app.use("/api/auth", authService);
app.use("/api/saga", sagaService);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(port, () => {
  console.log(`API Gateway com proxy reverso rodando na porta ${port}`);
});
