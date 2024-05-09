const knex = require("../knex");
const DIARY_TABLE = "diary";

module.exports = {
  getAll() {
    return knex.select("*").from(DIARY_TABLE);
  },

  createDiary(userID, foodTitle, foodDescription, imageURL) {
    return knex
      .insert({
        user_id: userID,
        date_created: new Date(),
        food_title: foodTitle,
        food_description: foodDescription,
        image_url: imageURL,
      })
      .into(DIARY_TABLE);
  },

  getDiarybyUserID(userID) {
    return knex.select("*").where("user_id", userID).from(DIARY_TABLE);
  },

  editDiary(diaryID, foodTitle, foodDescription) {
    return knex(DIARY_TABLE).where({ diary_id: diaryID }).update({
      food_title: foodTitle,
      food_description: foodDescription,
    });
  },

  deleteDiary(deletedId) {
    return knex(DIARY_TABLE).where("diary_id", deletedId).del();
  },

  editDiaryTitle(diaryID, foodTitle) {
    return knex(DIARY_TABLE).where({ diary_id: diaryID }).update({
      food_title: foodTitle,
    });
  },
  
  editDiaryDescription(diaryID, foodDescription) {
    return knex(DIARY_TABLE).where({ diary_id: diaryID }).update({
      food_description: foodDescription,
    });
  },
};
