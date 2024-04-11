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
      },
      description: DataTypes.STRING,
      docPath: DataTypes.STRING,
      startedAt: DataTypes.DATE,
      category: DataTypes.STRING,
      completedAt: DataTypes.DATE,
      status: {
        type: DataTypes.ENUM("Inprogress", "Completed", "Blocked", "Hold"),
        defaultValue: "Inprogress",
      },
      isDeleted: {
        type: DataTypes.ENUM("0", "1"),
        defaultValue: "0",
      },
      userId: DataTypes.INTEGER,
    },
    {
      tableName: "tasks",
    }
  );

  return tasks;
};
