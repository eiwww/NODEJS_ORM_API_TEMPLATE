const db = require("../../../models");
const { Province } = db;

module.exports = {
  getAllProvinces: async (req, res, next) => {
    try {
      let provinces = await Province.findAll({
        where: { isDelete: "no" },
        order: [["section", "ASC"]],
      });

      if (!provinces || provinces.length === 0) {
        const error = new Error("ຍັງບໍ່ມີຂໍ້ມູນ");
        error.status = 403;
        throw error;
      }

      res.status(200).json({
        provinces,
      });
    } catch (error) {
      next(error);
    }
  },

  createNewProvince: async (req, res, next) => {
    const { name, section } = req.body;

    const t = await db.sequelize.transaction();

    try {
      let province = await Province.create(
        {
          name,
          section,
        },
        { transaction: t }
      );

      if (!province) {
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

  updateProvinceById: async (req, res, next) => {
    const { provinceId, name, section } = req.body;

    const t = await db.sequelize.transaction();

    try {
      let province = await Province.findOne(
        {
          where: { id: provinceId },
        },
        { transaction: t }
      );

      if (!province) {
        const error = new Error("ບໍ່ພົບຂໍ້ມູນ");
        error.status = 404;
        throw error;
      }

      await province.update(
        {
          name,
          section,
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

  deleteProvinceById: async (req, res, next) => {
    const { provinceId } = req.body;

    const t = await db.sequelize.transaction();

    try {
      let province = await Province.findOne(
        {
          where: { id: provinceId },
        },
        { transaction: t }
      );

      if (!province || province.isDelete === "yes") {
        const error = new Error("ບໍ່ພົບຂໍ້ມູນ");
        error.status = 404;
        throw error;
      }

      await province.update(
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
