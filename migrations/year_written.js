const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blogs', 'year_written', {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isGreaterThanOrEqual(value) {
          return new Promise((resolve, reject) => {
            const currentYear = new Date().getFullYear();
            if (value < 1991 || value > currentYear) {
              reject('Year must be at least 1991 and not greater than the current year');
            } else {
              resolve();
            }
          });
        },
      },
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'year_written')
  },
}