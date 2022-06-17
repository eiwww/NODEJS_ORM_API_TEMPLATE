const express = require("express");
const router = express.Router();
const controller = require("../controllers/province.controller");
const { authJwt } = require("../../../middlewares");

router.get(
  "/",
  [authJwt.verifyToken, authJwt.isSuperAdmin],
  controller.getAllProvinces
); // get all provinces
router.post(
  "/",
  [authJwt.verifyToken, authJwt.isSuperAdmin],
  controller.createNewProvince
); // create new province
router.put(
  "/",
  [authJwt.verifyToken, authJwt.isSuperAdmin],
  controller.updateProvinceById
); // update province data
router.post(
  "/delete",
  [authJwt.verifyToken, authJwt.isSuperAdmin],
  controller.deleteProvinceById
); // delete province

module.exports = router;
