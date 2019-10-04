//           1 - Creating our first Student Schema

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StudentShema = new Schema({
  name: String
});

const Student = mongoose.model("student", StudentShema);

// export
module.exports = Student;