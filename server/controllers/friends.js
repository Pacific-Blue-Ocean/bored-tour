const models = require('../models/friends');

const getFriends = async (req, res) => {
  const { id } = req.query;
  try {
    const { rows } = await models.getFriends(id);
    res.send(rows);
  } catch (e) {
    res.status(500).send(e);
  }
};

const addFriend = async (req, res) => {
  const { user_id, friend_id } = req.body;

  try {
    await models.addFriend(user_id, friend_id);
    res.send(`Sucessfully added friend_id ${friend_id} for user_id ${user_id}`);
  } catch (e) {
    res.status(500).send(e);
  }
};

const removeFriend = async (req, res) => {
  const { user_id, friend_id } = req.body;

  try {
    await models.removeFriend(user_id, friend_id);
    res.send(`Sucessfully removed friend_id ${friend_id} for user_id ${user_id}`);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = {
  getFriends,
  addFriend,
  removeFriend,
};
