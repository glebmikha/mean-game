const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.checkName = functions.https.onCall((data, context) => {
  const ref = admin
    .firestore()
    .collection("users")
    .doc(data.name);
  return ref
    .get()
    .then(doc => {
      return { unique: !doc.exists };
    })
    .catch(err => {
      throw new functions.https.HttpsError("failed to connect");
    });
});

exports.getAverageError = functions.https.onCall((data, context) => {
  const ref = admin
    .firestore()
    .collection("answers")
    .where("user_id", "==", data.uid);
  let errors = [];
  return ref
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        errors.push(Math.abs(doc.data().error));
      });
      const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;
      const avg = average(errors);
      return {
        averageError: avg
      };
    })
    .catch(err => {
      throw new functions.https.HttpsError("failed to connect");
    });
});
