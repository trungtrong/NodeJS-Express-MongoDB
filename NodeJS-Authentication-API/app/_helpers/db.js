// connect to MongoDB
const mongoose = require('mongoose');

mongoose.connect(
  "mongodb://localhost/my_database",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

// using promise ES6
mongoose.Promise = global.Promise;
