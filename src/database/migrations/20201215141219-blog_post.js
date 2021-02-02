'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.createTable('blog_post', {

      id: {

        type: Sequelize.INTEGER.UNSIGNED.ZEROFILL,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,

      },

      post_author:{

        type: Sequelize.INTEGER,
        references: {model: 'blog_users', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,

      },

      post_date: {

        type: Sequelize.DATE,
        allowNull: false,
        
      },

      post_title: {

        type: Sequelize.STRING,
        allowNull: false,

      },

      post_content: {

        type: Sequelize.TEXT,
        allowNull: false,

      },

      post_category: {

        type: Sequelize.INTEGER,
        references: {model: 'blog_category', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,

      },

      users_meta: {

        type: Sequelize.INTEGER,
        references: {model: 'users_meta', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,

      },

      deleted_at: {

        type: Sequelize.DATE,
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
    
    await queryInterface.dropTable('blog_post');

  }
};
