'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.createTable('user_infos', {

      id: {

        type: Sequelize.INTEGER.UNSIGNED.ZEROFILL,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,

      },

      user_description: {

        type: Sequelize.TEXT,
        allowNull: true,
        
      },

      user_github: {

        type: Sequelize.STRING,
        allowNull: true,

      },

      user_linkedin: {

        type: Sequelize.STRING,
        allowNull: true,

      },

      user_site: {

        type: Sequelize.STRING,
        allowNull: true,

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
    
    await queryInterface.dropTable('user_infos');

  }
};
