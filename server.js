const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const multer = require("multer");
require("dotenv").config();

const multerConfig = require("./config/multer");

// ----- Import Routes Begin ----- //
const loginRoutes = require("./api/v1/routes/login.route");
const userRoutes = require("./api/v1/admin/routes/user.route");
const provinceRoutes = require("./api/v1/routes/province.route");
const districtRoutes = require("./api/v1/routes/district.route");
// ----- Import Routes End ----- //

// const corsOptions = {
//   origin: ["http://localhost:4200"],
//   methods: ["POST"],
//   optionsSuccessStatus: 200,
// };

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(multer(multerConfig.config).single(multerConfig.keyUpload));
app.use("/images", express.static(__dirname + "/uploads/images/"));

// ----- Route Begin ----- //
app.use("/api/v1/login", loginRoutes);
app.use("/api/v1/admin/users", userRoutes);
app.use("/api/v1/provinces", provinceRoutes);
app.use("/api/v1/districts", districtRoutes);
// ----- Route End ----- //

app.use((req, res, next) => {
  const error = new Error("ບໍ່ພົບຂໍ້ມູນ");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      statusCode: error.status,
      message: error.message,
    },
  });
});

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(
  PORT,
  console.log(`Autotrade System API Server started on port ${PORT}`)
);
