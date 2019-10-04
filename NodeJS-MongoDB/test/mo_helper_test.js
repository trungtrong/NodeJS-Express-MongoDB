const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // ES6- promise

/*
  - in this before , that means whatever happens, this is the helper file
  which is gonna run for the very first

  - before() here: each time, we run "npm run test"
      to connect and save a document to my schema "student"
    => each insert one new student document in database
*/

// connect to the db before the tests run
before((done) => {
  mongoose.connect(
    "mongodb://localhost/mongotube",
    { useNewUrlParser: true }
  );

  mongoose.connection
      .once('open', () => {
        //console.log("Connected"):

        done();
      })
      .on('error', () => console.log("Your Error", error));
});

/*
  - done() is the method, whenever you want to call it, you can call it
  and it's gonna pass on further information that "hey, my job was all done,
  my test was all good"
*/

// drop the characters collection before each test
beforeEach((done) => {
  // drop the collection
  // NOTE: student(s) is PLURAL
  // this is async request
  mongoose.connection.collections.students.drop(() => {
    /* hey, drop() is success */
    done();
  });

})

/*
  drop other student(trung lap) and keep one student
  + ghi de len 1 cai same info: same instance
  and each time we run "npm run test"
  => this student document changes its _ID
*/


