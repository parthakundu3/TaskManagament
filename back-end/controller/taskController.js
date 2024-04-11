const models = require("../models/index");
const taskModel = models.tasks;
const constants = require("../constants.json");

//console.log("checking", userModel);

exports.taskCreate = (req, res) => {
  console.log("checking", req.userLoginData);
  const { taskName, description, docPath, category, completedAt, startedAt } =
    req.body;
  taskModel
    .create({
      taskName: taskName,
      description: description,
      docPath: docPath,
      startedAt: startedAt,
      category: category,
      completedAt: completedAt,
      userId: req.userLoginData,
    })
    .then((result) => {
      res.status(constants.HTTP_STATUS.CREATED);
      res.json(result);
    })
    .catch(async (error) => {
      res.status(constants.HTTP_STATUS.INTERNAL_SERVER_ERROR);
      res.json({
        message: error.message,
      });
    });
};
