const diaryModel = require("./diary.model");

module.exports = {
  async getAll(req, res) {
    const diaries = await diaryModel.getAll();
    res.status(200).send(diaries);
  },

  async getDiarybyUserID(req, res) {
    const userID = req.params.userID;
    const userDiaries = await diaryModel.getDiarybyUserID(userID);
    res.status(200).send(userDiaries);
  },

  async createDiary(req, res) {
    const { userID, foodTitle, foodDescription, imageURL } = req.body;
    await diaryModel.createDiary(userID, foodTitle, foodDescription, imageURL);
    res.status(200).send("New diary entry created!");
  },

  async editDiary(req, res) {
    const diaryID = req.params.id;
    const { foodTitle, foodDescription } = req.body;

    const hasTitle = foodTitle !== undefined && foodTitle !== null;
    const hasDescription =
      foodDescription !== undefined && foodDescription !== null;

    if (hasTitle && hasDescription) {
      // Both foodTitle and foodDescription are provided
      await diaryModel.editDiary(diaryID, foodTitle, foodDescription);
    } else if (hasTitle) {
      // Only foodTitle is provided
      await diaryModel.editDiaryTitle(diaryID, foodTitle);
    } else if (hasDescription) {
      // Only foodDescription is provided
      await diaryModel.editDiaryDescription(diaryID, foodDescription);
    } else {
      // Neither foodTitle nor foodDescription is provided
      return res.status(400).send("Invalid request body");
    }

    res.status(200).send("Diary entry updated!");
  },

  async deleteDiary(req, res) {
    const deletedId = req.params.id;
    await diaryModel.deleteDiary(deletedId);
    res.status(200).send("Diary entry deleted!");
  },
};
