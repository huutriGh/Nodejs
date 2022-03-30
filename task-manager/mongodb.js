//CRUD create read update delete

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectId;

const { MongoClient, ObjectId } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// const id = new ObjectId();
// console.log('id: ', id.toHexString());
// console.log('id: ', id.getTimestamp());

MongoClient.connect(
  connectionURL,

  (error, client) => {
    if (error) {
      console.log(error);
      return console.log('Unable connect to database!');
    }
    console.log('Connected correctly!');
    const db = client.db(databaseName);
    // db.collection('user').insertOne(
    //   {
    //     name: 'Andrew',
    //     age: 27,
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.log('Unable to insert user');
    //     }
    //     console.log('result: ', result);
    //   }
    // );
    // db.collection('user').insertMany(
    //   [
    //     {
    //       name: 'Jen',
    //       age: 27,
    //     },
    //     {
    //       name: 'Gunter',
    //       age: 27,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log('Unable to insert documents');
    //     }
    //     console.log('result: ', result);
    //   }
    // );
    // db.collection('tasks').insertMany(
    //   [
    //     {
    //       description: 'clean the house',
    //       completed: true,
    //     },
    //     {
    //       description: 'Renew inspection',
    //       completed: false,
    //     },
    //     {
    //       description: 'Pot plan',
    //       completed: false,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log('Unable to insert documents');
    //     }
    //     console.log('result: ', result);
    //   }
    // );

    // db.collection('user').findOne(
    //   { _id: new ObjectId('6232b4a03a95aa5dbb770dd7') },
    //   (error, user) => {
    //     if (error) {
    //       return console.log('Unable to fetch');
    //     }
    //     console.log(user);
    //   }
    // );

    // db.collection('user')
    //   .find({ age: 27 })
    //   .toArray((error, users) => {
    //     console.log(users);
    //   });

    const updatePromise = db.collection('user').updateOne(
      { _id: new ObjectId('6232b4a03a95aa5dbb770dd7') },
      {
        $set: {
          name: 'Mike',
        },
      }
    );
    updatePromise
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);
