'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.createTable('blog_users', {

      id: {

        type: Sequelize.INTEGER.UNSIGNED.ZEROFILL,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,

      },

      user_login: {

        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        
      },

      user_pass: {

        type: Sequelize.STRING,
        allowNull: false,

      },

      display_name: {

        type: Sequelize.STRING,
        allowNull: false,
        unique: true,

      },

      user_email: {

        type: Sequelize.STRING,
        allowNull: false,
        unique: true,

      },

      user_status: {

        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    
    await queryInterface.dropTable('blog_users');

  }
};
