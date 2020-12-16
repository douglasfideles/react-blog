'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.createTable('blog_category', {

      id: {

        type: Sequelize.INTEGER.UNSIGNED.ZEROFILL,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,

      },

      category_name:{

        type: Sequelize.STRING,
        allowNull: false,

      },


      created_at: {

        type: Sequelize.DATE,
        allowNull: false,

      },

      updated_at: {

        type: Sequelize.DATE,
        allowNull: false,

      },
    });

  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.dropTable('blog_category');

  }
};
