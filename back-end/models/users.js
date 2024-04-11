module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fullname: {
        type: DataTypes.STRING,
        validate: {
          is: /^[a-zA-Z\s\,]+$/i,
        },
      },
      email: {
        type: DataTypes.STRING,
        isEmail: true,
      },
      password: DataTypes.STRING,
    },
    {
      tableName: "users",
    }
  );

  return users;
};
