const mongoose = require("mongoose");
const config = require("./config");
const {nanoid} = require("nanoid");
const Users = require("./models/Users");
const Messages = require("./models/Messages");

const run = async () => {
  await mongoose.connect(config.db.url, config.db.options);
  await mongoose.connection.db.dropCollection('users');
  await mongoose.connection.db.dropCollection('messages');

  const [moderator, user] = await Users.create({
    email: 'moderator@mail.com',
    password: '123',
    displayName: 'moderator',
    token: nanoid(),
    avatar: 'https://cdn3.iconfinder.com/data/icons/abstract-1/512/moderator-512.png',
    role: 'moderator',
  }, {
    email: 'user@mail.com',
    password: '123',
    displayName: 'user',
    token: nanoid(),
    avatar: 'https://i.pinimg.com/474x/bc/d4/ac/bcd4ac32cc7d3f98b5e54bde37d6b09e.jpg',
    role: 'user',
  });

  await Messages.create({
    author: moderator,
    body: 'Hi guys! Welcome to our chat, please be polite to each other.',
    date: new Date(),
  }, {
    author: user,
    body: 'Hello there! General Kenobi...',
    date: new Date(),
  })
  await mongoose.connection.close();
};

run().catch(e=>console.error(e));