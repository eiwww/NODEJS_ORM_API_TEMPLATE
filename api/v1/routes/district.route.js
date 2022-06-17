const express = require("express");
const router = express.Router();
const controller = require("../controllers/district.controller");
const { authJwt } = require("../../../middlewares");

router.get(
  "/:provinceId",
  [authJwt.verifyToken, authJwt.isSuperAdmin],
  controller.getAllDistrictByProvinceId
); // get all provinces
router.post(
  "/",
  [authJwt.verifyToken, authJwt.isSuperAdmin],
  controller.createNewDistrict
); // create new province
router.put(
  "/",
  [authJwt.verifyToken, authJwt.isSuperAdmin],
  controller.updateDistrictById
); // update province data
router.post(
  "/delete",
  [authJwt.verifyToken, authJwt.isSuperAdmin],
  controller.deleteDistrictById
); // delete province

module.exports = router;
