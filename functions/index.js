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
