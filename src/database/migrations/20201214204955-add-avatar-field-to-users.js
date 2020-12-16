'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('blog_users','avatar_id',
      {
        type: Sequelize.INTEGER,
        references: {model: 'files', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      }
    )

  },

  down: async (queryInterface) => {

    return queryInterface.removeColumn('blog_users', 'avatar_id');
    
  }
};
