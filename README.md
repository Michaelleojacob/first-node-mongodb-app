first time using mongodb and node!

getting started:
https://www.mongodb.com/languages/javascript/mongodb-and-npm-tutorial

VSC:
-npm init -y
-npm i mongodb
-have mongodb extension installed
-connect by string (get string by going to mongodb.com and hitting 'connect' -> get string)
-setup .env
-npm i dotenv
-touch .env

-add `"type": "module",` to package.json

connect to cluster boilerplate:

```js
export async function connectToCluster(uri) {
  let mongoClient;

  try {
    mongoClient = new MongoClient(uri);
    console.log('Connecting to MongoDB Atlas cluster...');
    await mongoClient.connect();
    console.log('Successfully connected to MongoDB Atlas!');

    return mongoClient;
  } catch (error) {
    console.error('Connection to MongoDB Atlas failed!', error);
    process.exit();
  }
}
```

```js
export async function executeStudentCrudOperations() {
  const uri = process.env.DB_URI;
  let mongoClient;

  try {
    mongoClient = await connectToCluster(uri);
    const db = mongoClient.db('school');
    const collection = db.collection('students');
    // crud happens here!
  } finally {
    await mongoClient.close();
  }
}
```
