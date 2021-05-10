module.exports = {
  db: {
    url:'mongodb://localhost/chatapi',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  },
  facebookAppId: process.env.FACEBOOK_APP_ID,
  secretAppKey: process.env.FACEBOOK_APP_SECRET,
};