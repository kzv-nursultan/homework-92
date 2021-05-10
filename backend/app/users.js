const express = require('express');
const Users = require('../models/Users');
const {nanoid} = require("nanoid");
const config = require("../config");
const axios = require("axios");
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const user = new Users({
      email: req.body.email,
      displayName: req.body.displayName,
      password: req.body.password,
      avatar: req.body.avatar,
    });

    user.token = nanoid();
    await user.save();
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e?.message);
  }
});

router.post('/session', async (req, res) => {
  const user = await Users.findOne({email: req.body.email});
  if (!user) return res.status(400).send({error: 'Unauthorized user'});

  const isMatch = await user.checkPassword(req.body.password);
  if (!isMatch) return res.status(400).send({error: 'User not found'});

  try {
    user.generateToken();
    await user.save();
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e?.message);
  }
});

router.post('/facebookLogin', async (req, res) => {
  const inputToken = req.body.accessToken;
  const accessToken = config.facebookAppId + '|' + config.secretAppKey;
  const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

  try {
    const response = await axios.get(debugTokenUrl);

    if (response?.data.data.error) return res.status(401).send({error: 'Facebook token incorrect'});
    if (response?.data.data?.user_id !== req.body.id) return res.status(401).send({error: 'Wrong userID'})

    let user = await Users.findOne({facebookID: req.body.id});

    if (!user) {
      user = new Users({
        email: req.body.email,
        password: nanoid(),
        facebookID: req.body.id,
        displayName: req.body.name,
        avatar: req.body.picture.data.url,
      });
    }

    user.generateToken();
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send(e?.message);
  }

});

router.delete('/session/:id', async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) return res.send({message: 'Logged out successfully!'});

    user.generateToken();
    await user.save();
    res.send({message: 'Logged out successfully!'})
  } catch (e) {
    res.status(500).send(e?.message);
  }
});

router.get('/', async (req, res) => {
  const users = await Users.find();
  res.send(users);
});

router.delete('/:id', async (req, res)=>{
  await Users.findByIdAndDelete(req.params.id);
  res.send('success');
})

module.exports = router;