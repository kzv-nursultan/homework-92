require('dotenv').config();
const express = require("express");
const cors = require("cors");
const {nanoid} = require("nanoid");
const mongoose = require("mongoose");
const exitHook = require("async-exit-hook");
const config = require("./config")
const users = require("./app/users");
const Users = require("./models/Users");
const Messages = require("./models/Messages");
const app = express();

const port = 8000;

app.use(cors());
app.use(express.json());

app.use('/users', users);

require("express-ws")(app);

const activeConnections = {};

const connectionFn = (id, ws, req) => {
  console.log(`Client ${id} joined chat`);
  activeConnections[id] = ws;

  Object.keys(activeConnections).map( async key => {
    const user = await Users.findOne({token: req.query.token});
    const messagesList = await Messages.find().populate('author').sort({date: -1}).limit(5);
    activeConnections[id].user = user;
    const connection = activeConnections[key];
    const userArray = [];
    Object.keys(activeConnections).map(key =>  userArray.push(activeConnections[key]));
    if (ws.readyState === 1) {
      connection.send(JSON.stringify({
        type: 'ACTIVE_USERS',
        value: userArray,
        messagesList,
      }));
    }
  });
};

app.ws('/chat', async (ws, req)=>{
  const id = nanoid();
  connectionFn(id, ws, req);

  ws.on('message', async (msg) => {
    const decoded = JSON.parse(msg);
    switch (decoded.type) {
      case 'NEW_MESSAGE':
        if (decoded.value.author && decoded.value.body) {
          const user = await Users.findById(decoded.value.author);
          const newMessage = new Messages({
            author: user._id,
            body: decoded.value.body,
            date: new Date(),
          });
          await newMessage.save();
          newMessage.author = user;
          Object.keys(activeConnections).forEach(key => {
            const connection = activeConnections[key];
            connection.send(JSON.stringify({
              type: 'RECEIVE_MESSAGE',
              value: newMessage,
            }))
          })
        }
        break;
      case 'DELETE_MESSAGE':
        try {
          await Messages.findByIdAndDelete(decoded.id);
          Object.keys(activeConnections).forEach(key => {
            const connection = activeConnections[key];
            connection.send(JSON.stringify({
              type: 'DELETE_MESSAGE',
              id: decoded.id,
            }));
          })
        } catch (e) {
          console.error(e?.message);
        }
        break;
      case 'PERSONAL_MESSAGE':
        const author = await Users.findById(decoded.value.sender);
        Object.keys(activeConnections).map(key => {
          const connection = activeConnections[key];
          if (connection.user._id == decoded.value.sender) {
            connection.send(JSON.stringify({
              type: 'SECRET_MESSAGE',
              value: {
                _id: nanoid(),
                author,
                body: decoded.value.body,
                date: new Date(),
              }
            }));
          } else if (connection.user._id == decoded.value.recipient) {
            connection.send(JSON.stringify({
              type: 'SECRET_MESSAGE',
              value: {
                _id: nanoid(),
                author,
                body: decoded.value.body,
                date: new Date(),
              }
            }));
          }
        });
        break;
    }
  });

  ws.on('close', () => {
    console.log(`Client ${id} left chat`);
    const data = activeConnections[id].user._id;
    delete activeConnections[id];
    Object.keys(activeConnections).forEach(key => {
      const connection = activeConnections[key];
       connection.send(JSON.stringify({
         type: 'REMOVE_USER',
         value: data,
       }));
    });
  });
});

const run = async () => {
  await mongoose.connect(config?.db.url, config?.db.options);

  app.listen(port, ()=>{
    console.log(`Server started on ${port} port`);
  });

  exitHook(async callback => {
    await mongoose.disconnect();
    console.log(' mongoose was disconnected');
    callback();
  });
};

run().catch(e=>console.error(e));