"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.bulkInsert('provinces', [
    //    { name: 'ນະຄອນຫຼວງວຽງຈັນ', section: 'center', created_by: 1, updated_by: 1 }, // 1
    //    { name: 'ຜົ້ງສາລີ', section: 'north', created_by: 1, updated_by: 1 }, // 2
    //    { name: 'ຫຼວງນ້ຳທາ', section: 'north', created_by: 1, updated_by: 1 }, // 3
    //    { name: 'ອຸດົມໄຊ', section: 'north', created_by: 1, updated_by: 1 }, // 4
    //    { name: 'ບໍ່ແກ້ວ', section: 'north', created_by: 1, updated_by: 1 }, // 5
    //    { name: 'ຫຼວງພະບາງ', section: 'north', created_by: 1, updated_by: 1 }, // 6
    //    { name: 'ຫົວພັນ', section: 'north', created_by: 1, updated_by: 1 }, // 7
    //    { name: 'ໄຊຍະບູລີ', section: 'north', created_by: 1, updated_by: 1 }, // 8
    //    { name: 'ຊຽງຂວາງ', section: 'north', created_by: 1, updated_by: 1 }, // 9
    //    { name: 'ວຽງຈັນ', section: 'center', created_by: 1, updated_by: 1 }, // 10
    //    { name: 'ບໍລິຄຳໄຊ', section: 'center', created_by: 1, updated_by: 1 }, // 11
    //    { name: 'ຄຳມ່ວນ', section: 'center', created_by: 1, updated_by: 1 }, // 12
    //    { name: 'ສະຫວັນນະເຂດ', section: 'center', created_by: 1, updated_by: 1 }, // 13
    //    { name: 'ສາລະວັນ', section: 'south', created_by: 1, updated_by: 1 }, // 14
    //    { name: 'ເຊກອງ', section: 'south', created_by: 1, updated_by: 1 }, // 15
    //    { name: 'ຈຳປາສັກ', section: 'south', created_by: 1, updated_by: 1 }, // 16
    //    { name: 'ອັດຕະປື', section: 'south', created_by: 1, updated_by: 1 }, // 17
    //    { name: 'ໄຊສົມບູນ', section: 'center', created_by: 1, updated_by: 1 }, // 18
    // ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // await queryInterface.bulkDelete('provinces', null, {});
  },
};
