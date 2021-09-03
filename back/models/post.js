module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define(
        "Post",
        {
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            rating: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            title: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            likeCount: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0,
            },
            category: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci",
        }
    );
    Post.associate = (db) => {
        db.Post.belongsTo(db.User);
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
        db.Post.belongsToMany(db.User, {
            through: "Like",
            as: "Likers",
        });
    };
    return Post;
};
