const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessagesSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const Messages = mongoose.model('Messages', MessagesSchema);
module.exports = Messages;