module.exports = (sequelize, DataTypes) => {
  const tasks = sequelize.define(
    "tasks",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      taskName: {
        type: DataTypes.STRING,
        validate: {
          is: /^[a-zA-Z\s\,]+$/i,
        },
      },
      description: DataTypes.STRING,
      docPath: DataTypes.STRING,
      startedAt: DataTypes.DATE,
      category: DataTypes.STRING,
      completedAt: DataTypes.DATE,
      status: DataTypes.STRING,
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      userId: DataTypes.INTEGER,
    },
    {
      tableName: "tasks",
    }
  );

  return tasks;
};
