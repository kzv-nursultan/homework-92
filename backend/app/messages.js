const express = require("express");
const Messages = require("../models/Messages");
const router = express.Router();


router.delete('/', async (req, res) => {
  await Messages.deleteMany({author: '60965cf15c8128609b76ca86'});
  res.send('success');
})

module.exports = router;
