// making a table in the sql db
// install the following packages
//## sequelize ## -g sequelize-cli ## mysql
//in the config file specify the username, password, host and the db name

module.exports = (sequelize, DataTypes) => {
	const Posts = sequelize.define("Posts", {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		postText: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
	// to make a comment table you must associate it with the posts table because each post might have different comments
	// onDelete:"cascade" makes that whenever you delete a post all its associated comments will be deleted too
	// this will make a new column called PostId
	Posts.associate = (models) => {
		Posts.hasMany(models.Comments, {
			onDelete: "cascade",
		});
	};
	return Posts;
};
