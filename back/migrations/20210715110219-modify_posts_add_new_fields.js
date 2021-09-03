module.exports = {
    up(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.changeColumn("Posts", "rating", {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: true,
            }),
            queryInterface.changeColumn("Posts", "title", {
                type: Sequelize.TEXT,
                allowNull: true,
            }),
            queryInterface.changeColumn("Posts", "createdAt", {
                type: Sequelize.DATEONLY,
                allowNull: true,
            }),
            queryInterface.changeColumn("Posts", "likeCount", {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0,
            }),
            queryInterface.changeColumn("Posts", "category", {
                type: Sequelize.STRING,
                allowNull: false,
            }),
        ]);
    },

    down(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.changeColumn("Posts", "rating", {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: true,
            }),
            queryInterface.changeColumn("Posts", "title", {
                type: Sequelize.TEXT,
                allowNull: true,
            }),
            queryInterface.changeColumn("Posts", "createdAt", {
                type: Sequelize.DATEONLY,
                allowNull: true,
            }),
            queryInterface.changeColumn("Posts", "likeCount", {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0,
            }),
            queryInterface.changeColumn("Posts", "category", {
                type: Sequelize.STRING,
                allowNull: false,
            }),
        ]);
    },
};
