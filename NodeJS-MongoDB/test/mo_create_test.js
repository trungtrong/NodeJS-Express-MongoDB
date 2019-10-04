// add my built-in schema
const Student = require('../app/student');

const assert = require('assert');

// we need to describe block
describe('Create Testss', () => {
  it('create a user in DB', () => {
    // assert(true);

    const same = new Student({
      name: "Sam"
    });
    /*  https://mongoosejs.com/docs/api.html#document_Document-$locals
      save Sam info into database
    */
    same.save()
        .then(() => {
          assert(!same.isNew);
          /*
            b/c: we want to save() is successful
            => assertion must be "false"
          */
        })
        .catch(() => {
          console.log("error");
        })
  });
});


/*
    All read tests
*/

describe("Read Test", () => {
  let reader;
  // create an instance of document
  beforeEach((done) => {
    reader =new Student({name: "Reader"});
    reader.save()
        .then(() => {
          done();
        })
  })

  it("Read a user: Reader", (done) => {
    Student.find({name: "Reader"})
      .then(students => {
        /*
         _id is BSON value: ObjectId:
         + we can compare _id in MongoDB, b/c it is ObjectId of BSON
         + we can only convert it to String
        */
       console.log(students);
       // [ { _id: 5d9705f2f3978d0761104677, name: 'Reader', __v: 0 } ]

       // reader: Reader, itself
        assert(reader._id.toString() === students[0]._id.toString());
        /*  when assert() done => done()*/
        done();
      })
  });
});


/*
    Delete test
*/

describe("Delete Tests", () => {
  let deleter;

  beforeEach(done => {
    deleter = new Student({name: "deleter"});
    deleter.save().then(() => done());
  });

  it("A delete test for deleter", done => {
    Student.findOneAndDelete(deleter._id)
      .then(() => {
        console.log(Student.findOne({name: "Deleter"}));
        return Student.findOne({name: "Deleter"})
      })
      .then(student => {
        assert(student === null);
        done();
      })
  })
});


/*
    update
*/

describe('Update Tests', () => {
  let updater;

  beforeEach(done => {
    updater = new Student({name: "Updater"});

    updater.save()
      .then(() => done());
  });

  it('Set n Save test', () => {
    // update name by using set() method
    updater.set('name', "upUpdater");

    updater.save()
      .then(() => Student.find({}))
      .then(students => {
        assert(students[0].name !== "Updater");
      })
  })
})
