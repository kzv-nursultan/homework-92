const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {nanoid} = require("nanoid");
const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;

const UsersSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async function(value){
        if(this.isModified('email')) {
          const user = await Users.findOne({email: value});
          return !user;
        }
        return true;
      },
    }
  },
  password: {
    type: String,
    required: true,
  },
  token:{
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  avatar: String,
  facebookID: String,
  role:{
    type: String,
    required: true,
    default: 'user',
    enum: ['moderator', 'user'],
  }
});

UsersSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});

UsersSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.password;
    return ret;
  }
});

UsersSchema.methods.generateToken = function () {
  this.token = nanoid();
};

UsersSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const Users = mongoose.model('Users', UsersSchema);
module.exports = Users;