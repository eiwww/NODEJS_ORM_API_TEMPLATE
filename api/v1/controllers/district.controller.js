const db = require("../../../models");
const { District, Province } = db;

module.exports = {
  getAllDistrictByProvinceId: async (req, res, next) => {
    const provinceId = req.params.provinceId;

    try {
      let districts = await District.findAll({
        where: {
          provinceId: provinceId,
          isDelete: "no",
        },
        include: {
          model: Province,
          foreignKey: "provinceId",
          as: "province",
          attributes: ["id", "name", "section"],
        },
        order: [["id", "ASC"]],
      });

      if (!districts || districts.length === 0) {
        const error = new Error("ຍັງບໍ່ມີຂໍ້ມູນ");
        error.status = 403;
        throw error;
      }

      res.status(200).json({
        districts,
      });
    } catch (error) {
      next(error);
    }
  },

  createNewDistrict: async (req, res, next) => {
    const { provinceId, name } = req.body;

    const t = await db.sequelize.transaction();

    try {
      let district = await District.create(
        {
          provinceId,
          name,
        },
        { transaction: t }
      );

      if (!district) {
        const error = new Error("ໃສ່ຂໍ້ມູນບໍ່ຄົບ");
        error.status = 403;
        throw error;
      }

      await t.commit();

      res.status(201).json({
        message: "ການເພີ່ມສໍາເລັດ",
      });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  },

  updateDistrictById: async (req, res, next) => {
    const { districtId, provinceId, name } = req.body;

    const t = await db.sequelize.transaction();

    try {
      let district = await District.findOne(
        {
          where: { id: districtId, provinceId },
        },
        { transaction: t }
      );

      if (!district) {
        const error = new Error("ບໍ່ພົບຂໍ້ມູນ");
        error.status = 404;
        throw error;
      }

      await district.update(
        {
          provinceId,
          name,
        },
        { transaction: t }
      );

      await t.commit();

      res.status(200).json({
        message: "ການແກ້ໄຂສໍາເລັດ",
      });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  },

  deleteDistrictById: async (req, res, next) => {
    const { districtId, provinceId } = req.body;

    const t = await db.sequelize.transaction();

    try {
      let district = await District.findOne(
        {
          where: { id: districtId, provinceId },
        },
        { transaction: t }
      );

      if (!district || district.isDelete === "yes") {
        const error = new Error("ບໍ່ພົບຂໍ້ມູນ");
        error.status = 404;
        throw error;
      }

      await district.update(
        {
          isDelete: "yes",
        },
        { transaction: t }
      );

      await t.commit();

      res.status(200).json({ message: "ການລຶບສໍາເລັດ" });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  },
};
