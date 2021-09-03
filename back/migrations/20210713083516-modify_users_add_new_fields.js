module.exports = {
    up(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.addColumn(
                "Users", // table name
                "src", // new field name
                {
                    type: Sequelize.STRING,
                    allowNull: true,
                }
            ),
        ]);
    },

    down(queryInterface, Sequelize) {
        return Promise.all([queryInterface.removeColumn("Users", "src")]);
    },
};
