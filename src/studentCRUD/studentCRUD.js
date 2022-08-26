import { MongoClient } from 'mongodb';

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

export async function createStudentDocument(collection) {
  const studentDocument = {
    name: 'mig wig',
    birthdate: new Date(2000, 11, 20),
    address: { street: 'somewhere lane', city: 'San Diego', state: 'CA' },
  };
  await collection.insertOne(studentDocument);
}

export async function findStudentByName(collection, name) {
  return collection.find({ name }).toArray();
}

export async function updateStudentByName(collection, name, updatedFields) {
  await collection.updateOne({ name }, { $set: updatedFields });
}

export async function deleteStudentByName(collection, name) {
  await collection.deleteOne({ name });
}

export async function executeStudentCrudOperations() {
  const uri = process.env.DB_URI;
  let mongoClient;

  try {
    mongoClient = await connectToCluster(uri);
    const db = mongoClient.db('school');
    const collection = db.collection('students');

    //! CREATE STUDENT
    // await createStudentDocument(collection);

    //! FIND STUDENT
    console.log(await findStudentByName(collection, 'mig wig'));

    //! UPDATE STUDENT
    // await updateStudentByName(collection, 'mig wig', {
    //   birthdate: new Date(2001, 5, 5),
    // });
    // console.log(await findStudentByName(collection, 'mig wig'));

    //! DELETE STUDENT
    // await deleteStudentByName(collection, 'mig wig');
    // console.log(await findStudentByName(collection, 'mig wig'));
  } finally {
    await mongoClient.close();
  }
}
