'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('blog_users','user_infoid',
      {
        type: Sequelize.INTEGER,
        references: {model: 'user_info', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      }
    )

  },

  down: async (queryInterface) => {

    return queryInterface.removeColumn('blog_users', 'user_infoid');
    
  }
};
